package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "itinerary_items")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ItineraryItem {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itinerary_id", nullable = false)
    private Itinerary itinerary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    private Destination destination;

    @Column(name = "day_number")
    private int day;

    @Column(name = "start_time")
    private String time;

    private String activity;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer duration;
    private Double cost;
    private Double carbonImpact;

    @Enumerated(EnumType.STRING)
    private ActivityType type;

    public enum ActivityType { TRANSPORT, ACCOMMODATION, ACTIVITY, MEAL, FREE_TIME, CULTURAL }
}
