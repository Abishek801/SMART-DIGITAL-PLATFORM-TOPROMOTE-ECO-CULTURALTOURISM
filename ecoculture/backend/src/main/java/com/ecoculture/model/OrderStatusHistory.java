package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_status_history")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class OrderStatusHistory {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Enumerated(EnumType.STRING)
    private Order.OrderStatus fromStatus;

    @Enumerated(EnumType.STRING)
    private Order.OrderStatus toStatus;
    
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
    
    private String notes;
    private String trackingNumber;
    private String changedBy;
}
