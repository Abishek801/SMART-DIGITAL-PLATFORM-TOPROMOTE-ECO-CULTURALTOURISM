package com.ecoculture.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "login_events")
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class LoginEvent {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String userId; // Optional, might be null if unknown user
    private String email;
    
    @Builder.Default
    private LocalDateTime loginTime = LocalDateTime.now();
    
    private LocalDateTime logoutTime;
    private String ipAddress;
    private String userAgent;
    private String deviceType;
    private String browser;
    private String status; // SUCCESSFUL or FAILED
    private String failureReason;
}
