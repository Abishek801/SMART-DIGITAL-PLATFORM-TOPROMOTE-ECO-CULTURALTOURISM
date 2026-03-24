package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    
    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private double price;

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String galleryUrls;

    @Builder.Default
    private int stock = 0;

    private String origin;
    private String artisan;
    private String artisanAvatar;

    @Builder.Default
    private int ecoScore = 0;

    @Column(columnDefinition = "TEXT")
    private String certifications;

    @Builder.Default
    private boolean featured = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Ownership
    private String shopId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shopId", referencedColumnName = "id", insertable = false, updatable = false)
    private ArtisanProfile shop;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;

    public enum ProductCategory { 
        CRAFTS, ORGANIC_FOOD, HANDLOOM, WELLNESS, FASHION, ACCESSORIES, 
        HOME_DECOR, FOOD, CLOTHING 
    }

    @PreUpdate protected void onUpdate() { this.updatedAt = LocalDateTime.now(); }
}
