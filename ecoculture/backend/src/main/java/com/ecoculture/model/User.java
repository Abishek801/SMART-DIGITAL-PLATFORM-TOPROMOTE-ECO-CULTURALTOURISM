package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String name;

    private String passwordHash;
    private String image;
    private boolean emailVerified;
    private boolean twoFactorEnabled;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.TRAVELER;

    private String guideId;
    private String shopId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guideId", referencedColumnName = "id", insertable = false, updatable = false)
    private GuideProfile guideProfile;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shopId", referencedColumnName = "id", insertable = false, updatable = false)
    private ArtisanProfile artisanProfile;

    @Builder.Default
    private int ecoScore = 0;

    @Builder.Default
    private int loginAttempts = 0;

    private LocalDateTime lockedUntil;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Itinerary> itineraries;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isLocked() {
        return lockedUntil != null && lockedUntil.isAfter(LocalDateTime.now());
    }

    public enum Role {
        SUPER_ADMIN, ADMIN, GUIDE, ARTISAN, TRAVELER
    }
}
