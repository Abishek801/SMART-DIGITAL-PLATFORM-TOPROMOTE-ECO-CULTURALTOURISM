package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "destinations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String shortDescription;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String country;
    private String region;

    private double latitude;
    private double longitude;

    @Builder.Default
    private int sustainabilityScore = 0;

    @Builder.Default
    private double carbonSaved = 0;

    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String galleryUrls;   // JSON array

    @Column(columnDefinition = "TEXT")
    private String highlights;    // JSON array

    private String bestSeason;
    private double avgCost;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Difficulty difficulty = Difficulty.EASY;

    @Builder.Default
    private boolean featured = false;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews;

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    // Ownership
    private String guideId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guideId", referencedColumnName = "id", insertable = false, updatable = false)
    private GuideProfile guide;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum Category {
        NATURE, CULTURE, ADVENTURE, HERITAGE, WELLNESS, COMMUNITY,
        ECO_VILLAGE, TREKKING, WILDLIFE
    }

    public enum Difficulty {
        EASY, MODERATE, HARD, CHALLENGING, EXPERT
    }
}
