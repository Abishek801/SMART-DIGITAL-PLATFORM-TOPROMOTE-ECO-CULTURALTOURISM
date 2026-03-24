package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Booking {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;

    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private int guests;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    private double totalCost;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum BookingStatus { PENDING, CONFIRMED, CANCELLED, COMPLETED }
}
