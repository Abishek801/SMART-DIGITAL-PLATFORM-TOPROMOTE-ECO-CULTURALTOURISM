package com.ecoculture.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// ─── Auth Request/Response DTOs ──────────────────────────────────────────────

public class AuthDtos {

    @Data
    public static class RegisterRequest {
        @NotBlank(message = "Name is required")
        @Size(min = 2, max = 100)
        private String name;

        @Email(message = "Invalid email")
        @NotBlank(message = "Email is required")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        private String password;
    }

    @Data
    public static class LoginRequest {
        @Email @NotBlank
        private String email;

        @NotBlank
        private String password;
    }

    @Data
    public static class AuthResponse {
        private String accessToken;
        private String refreshToken;
        private UserDto user;
        private boolean requires2fa;

        public AuthResponse(String accessToken, String refreshToken, UserDto user) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.user = user;
            this.requires2fa = false;
        }

        public AuthResponse(boolean requires2fa, String email) {
            this.requires2fa = requires2fa;
            this.user = new UserDto();
            this.user.setEmail(email);
        }
    }

    @Data
    public static class UserDto {
        private String id;
        private String name;
        private String email;
        private String image;
        private String role;
        private int ecoScore;

        public UserDto() {}

        public UserDto(com.ecoculture.model.User user) {
            this.id = user.getId();
            this.name = user.getName();
            this.email = user.getEmail();
            this.image = user.getImage();
            this.role = user.getRole().name();
            this.ecoScore = user.getEcoScore();
        }
    }

    @Data
    public static class ForgotPasswordRequest {
        @Email @NotBlank
        private String email;
    }

    @Data
    public static class ResetPasswordRequest {
        @NotBlank
        private String token;

        @NotBlank
        @Size(min = 8)
        private String password;
    }

    @Data
    public static class RefreshTokenRequest {
        @NotBlank
        private String refreshToken;
    }

    @Data
    public static class VerifyOtpRequest {
        @Email @NotBlank
        private String email;
        @NotBlank
        private String code;
    }
}
