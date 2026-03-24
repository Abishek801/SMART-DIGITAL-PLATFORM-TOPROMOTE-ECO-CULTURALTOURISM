package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "itineraries")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Itinerary {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String destination;
    private int duration;
    private String travelStyle;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Budget budget = Budget.MODERATE;

    @Builder.Default
    private double carbonFootprint = 0;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.DRAFT;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItineraryItem> items;

    public enum Budget { BUDGET, MODERATE, COMFORTABLE, LUXURY }
    public enum Status { DRAFT, ACTIVE, COMPLETED, ARCHIVED }

    @PreUpdate protected void onUpdate() { this.updatedAt = LocalDateTime.now(); }
}
