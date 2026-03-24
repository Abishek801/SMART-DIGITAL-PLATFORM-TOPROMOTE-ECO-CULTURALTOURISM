package com.ecoculture.service;

import com.ecoculture.model.Order;
import com.ecoculture.model.OrderStatusHistory;
import com.ecoculture.repository.OrderRepository;
import com.ecoculture.repository.OrderStatusHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderStatusService {

    private final OrderRepository orderRepository;
    private final OrderStatusHistoryRepository historyRepository;

    @Transactional
    public Map<String, Object> updateOrderStatus(String orderId, String newStatusStr, String notes, String trackingNumber, String changedBy) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalArgumentException("Order not found"));
        Order.OrderStatus oldStatus = order.getStatus();
        Order.OrderStatus newStatus = Order.OrderStatus.valueOf(newStatusStr);

        order.setStatus(newStatus);
        orderRepository.save(order);

        OrderStatusHistory history = OrderStatusHistory.builder()
                .order(order)
                .fromStatus(oldStatus)
                .toStatus(newStatus)
                .notes(notes)
                .trackingNumber(trackingNumber)
                .changedBy(changedBy)
                .build();
        
        historyRepository.save(history);

        return Map.of(
                "orderId", order.getId(),
                "status", newStatus.name(),
                "message", "Order status updated successfully"
        );
    }

    public List<Map<String, Object>> getOrderHistory(String orderId) {
        return historyRepository.findByOrderIdOrderByTimestampDesc(orderId).stream()
                .map(h -> Map.<String, Object>of(
                        "id", h.getId(),
                        "fromStatus", h.getFromStatus() != null ? h.getFromStatus().name() : "",
                        "toStatus", h.getToStatus().name(),
                        "timestamp", h.getTimestamp().toString(),
                        "notes", h.getNotes() != null ? h.getNotes() : "",
                        "trackingNumber", h.getTrackingNumber() != null ? h.getTrackingNumber() : "",
                        "changedBy", h.getChangedBy() != null ? h.getChangedBy() : ""
                ))
                .collect(Collectors.toList());
    }
}
