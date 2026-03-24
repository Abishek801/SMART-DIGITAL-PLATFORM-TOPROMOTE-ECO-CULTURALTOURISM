package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "artisan_profiles")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ArtisanProfile {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String shopName;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(columnDefinition = "TEXT")
    private String story;
    
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String payoutDetails; // JSON
    
    private double rating;
    private boolean verified;

    @OneToOne(mappedBy = "artisanProfile")
    private User user;

    @OneToMany(mappedBy = "shop")
    private List<Product> products;
}
