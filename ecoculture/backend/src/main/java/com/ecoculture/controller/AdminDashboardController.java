package com.ecoculture.controller;

import com.ecoculture.model.LoginEvent;
import com.ecoculture.model.Order;
import com.ecoculture.repository.OrderRepository;
import com.ecoculture.service.LoginEventService;
import com.ecoculture.service.OrderStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final LoginEventService loginEventService;
    private final OrderStatusService orderStatusService;
    private final OrderRepository orderRepository;

    @GetMapping("/login-history")
    // @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')") 
    public ResponseEntity<Page<LoginEvent>> getLoginHistory(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size,
            @RequestParam(defaultValue = "loginTime") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(loginEventService.getLoginHistory(email, status, startDate, endDate, pageable));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")));
    }

    @PatchMapping("/orders/{id}/status")
    public ResponseEntity<Map<String, Object>> updateOrderStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        String newStatus = request.get("status");
        String notes = request.get("notes");
        String trackingNumber = request.get("trackingNumber");
        String changedBy = currentUser != null ? currentUser.getUsername() : "System";
        return ResponseEntity.ok(orderStatusService.updateOrderStatus(id, newStatus, notes, trackingNumber, changedBy));
    }

    @GetMapping("/orders/{id}/history")
    public ResponseEntity<List<Map<String, Object>>> getOrderStatusHistory(@PathVariable String id) {
        return ResponseEntity.ok(orderStatusService.getOrderHistory(id));
    }

    @GetMapping("/products/heatmap")
    public ResponseEntity<List<Map<String, Object>>> getProductHeatmap(
            @RequestParam(defaultValue = "30") int days,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "50") int limit
    ) {
        return ResponseEntity.ok(List.of(
                Map.of("productId", "p1", "productName", "Handwoven Bamboo Basket Set", "category", "HOME_DECOR", "purchases", 45, "revenue", 83250, "views", 1250, "stock", 35, "rating", 4.9),
                Map.of("productId", "p2", "productName", "Organic Nilgiri Blue Mountain Tea", "category", "FOOD", "purchases", 112, "revenue", 72800, "views", 3400, "stock", 120, "rating", 4.8),
                Map.of("productId", "p3", "productName", "Madhubani Silk Scarf", "category", "CLOTHING", "purchases", 28, "revenue", 61600, "views", 890, "stock", 18, "rating", 5.0),
                Map.of("productId", "p4", "productName", "Cold-Pressed Coconut Oil", "category", "WELLNESS", "purchases", 89, "revenue", 37380, "views", 2100, "stock", 200, "rating", 4.7),
                Map.of("productId", "p6", "productName", "Cane & Jute Sling Bag", "category", "ACCESSORIES", "purchases", 19, "revenue", 25650, "views", 450, "stock", 28, "rating", 4.8)
        ));
    }
}
