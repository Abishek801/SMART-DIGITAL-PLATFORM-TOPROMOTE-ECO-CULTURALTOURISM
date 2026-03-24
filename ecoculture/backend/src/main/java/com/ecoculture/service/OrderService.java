package com.ecoculture.service;

import com.ecoculture.model.Order;
import com.ecoculture.model.OrderItem;
import com.ecoculture.model.OrderStatusHistory;
import com.ecoculture.model.Product;
import com.ecoculture.model.User;
import com.ecoculture.repository.OrderRepository;
import com.ecoculture.repository.OrderStatusHistoryRepository;
import com.ecoculture.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderStatusHistoryRepository historyRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Map<String, Object> createOrder(User user, List<Map<String, Object>> items, double total, String paymentMethod) {
        Order order = Order.builder()
                .user(user)
                .status(Order.OrderStatus.PENDING)
                .total(total)
                .address("Eco-Courier Assured Delivery")
                .paymentRef(paymentMethod)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        for (Map<String, Object> itemData : items) {
            int qty = (Integer) itemData.getOrDefault("qty", 1);
            String productId = itemData.get("id").toString();
            
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found: " + productId));
            
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(qty)
                    .price(Double.valueOf(itemData.get("price").toString()))
                    .build();
            orderItems.add(item);
        }
        order.setItems(orderItems);
        orderRepository.save(order);

        // Record initial history
        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(order)
                .toStatus(Order.OrderStatus.PENDING)
                .notes("Order placed via " + paymentMethod)
                .changedBy(user.getEmail())
                .build();
        historyRepository.save(history);

        return Map.of(
                "orderId", order.getId(),
                "status", order.getStatus().name(),
                "total", order.getTotal()
        );
    }

    public List<Map<String, Object>> getUserOrders(User user) {
        return orderRepository.findAll().stream()
                .filter(o -> o.getUser().getId().equals(user.getId()))
                .map(o -> Map.<String, Object>of(
                        "id", o.getId(),
                        "status", o.getStatus().name(),
                        "total", o.getTotal(),
                        "createdAt", o.getCreatedAt().toString(),
                        "paymentRef", o.getPaymentRef() != null ? o.getPaymentRef() : "CARD",
                        "items", o.getItems().stream().map(i -> Map.of(
                                "name", i.getProduct() != null ? i.getProduct().getName() : "Unknown Product",
                                "qty", i.getQuantity(),
                                "price", i.getPrice(),
                                "productId", i.getProduct() != null ? i.getProduct().getId() : ""
                        )).collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> cancelOrder(String orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found or access denied"));
        
        if (!order.getUser().getId().equals(user.getId())) {
             throw new IllegalArgumentException("Access denied");
        }

        if (order.getStatus() != Order.OrderStatus.PENDING && order.getStatus() != Order.OrderStatus.CONFIRMED) {
             throw new IllegalStateException("Cannot cancel an order that is already " + order.getStatus().name());
        }

        Order.OrderStatus oldStatus = order.getStatus();
        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);

        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(order)
                .fromStatus(oldStatus)
                .toStatus(Order.OrderStatus.CANCELLED)
                .notes("Cancelled by user")
                .changedBy(user.getEmail())
                .build();
        historyRepository.save(history);

        return Map.of("orderId", order.getId(), "status", "CANCELLED");
    }

    /**
     * Runs every 1 hour. Scans for orders that were created more than 24 hours ago
     * and automatically transitions them to DELIVERED if they are not already DELIVERED or CANCELLED.
     */
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void autoDeliverOrders() {
        log.info("Running cron job: Auto-delivering 24hr orders");
        LocalDateTime threshold = LocalDateTime.now().minusHours(24);
        
        List<Order> ripeOrders = orderRepository.findAll().stream()
                .filter(o -> o.getCreatedAt().isBefore(threshold))
                .filter(o -> o.getStatus() != Order.OrderStatus.DELIVERED && o.getStatus() != Order.OrderStatus.CANCELLED)
                .toList();

        for (Order order : ripeOrders) {
            Order.OrderStatus oldStatus = order.getStatus();
            order.setStatus(Order.OrderStatus.DELIVERED);
            orderRepository.save(order);

            OrderStatusHistory history = OrderStatusHistory.builder()
                    .order(order)
                    .fromStatus(oldStatus)
                    .toStatus(Order.OrderStatus.DELIVERED)
                    .notes("System: Auto-delivered after 24 hours")
                    .changedBy("SYSTEM_CRON")
                    .build();
            historyRepository.save(history);
            
            log.info("Auto-delivered order: {}", order.getId());
        }
    }
}
