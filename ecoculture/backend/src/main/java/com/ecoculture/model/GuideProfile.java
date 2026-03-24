package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "guide_profiles")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class GuideProfile {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Column(columnDefinition = "TEXT")
    private String specialties; // JSON
    
    @Column(columnDefinition = "TEXT")
    private String languages; // JSON
    
    private int experience;
    
    @Column(columnDefinition = "TEXT")
    private String certifications; // JSON
    
    private double rating;
    private boolean verified;

    @OneToOne(mappedBy = "guideProfile")
    private User user;

    @OneToMany(mappedBy = "guide")
    private List<Destination> destinations;
}
