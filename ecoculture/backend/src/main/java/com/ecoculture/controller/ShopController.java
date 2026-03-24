package com.ecoculture.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.ecoculture.service.OrderService;
import com.ecoculture.model.User;
import com.ecoculture.repository.UserRepository;

import java.util.List;
import java.util.Map;

// ─── Product Controller ───────────────────────────────────────────────────────

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
class ProductController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) String q
    ) {
        // TODO: Query ProductRepository with filters
        // Returns list of products with eco scores, certifications, stock
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getProduct(@PathVariable String id) {
        // TODO: Fetch product by ID
        return ResponseEntity.ok(Map.of("id", id));
    }
}

// ─── Order Controller ─────────────────────────────────────────────────────────

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    private User getUserOrThrow(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        User user = getUserOrThrow(currentUser);
        List<Map<String, Object>> items = (List<Map<String, Object>>) request.get("items");
        double total = Double.parseDouble(request.get("total").toString());
        String paymentMethod = (String) request.getOrDefault("paymentMethod", "CARD");

        Map<String, Object> result = orderService.createOrder(user, items, total, paymentMethod);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getUserOrders(
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        User user = getUserOrThrow(currentUser);
        return ResponseEntity.ok(orderService.getUserOrders(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getOrder(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        return ResponseEntity.ok(Map.of("id", id));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Map<String, Object>> cancelOrder(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        User user = getUserOrThrow(currentUser);
        return ResponseEntity.ok(orderService.cancelOrder(id, user));
    }
}
