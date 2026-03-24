package com.ecoculture.service;

import com.ecoculture.model.LoginEvent;
import com.ecoculture.repository.LoginEventRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginEventService {

    private final LoginEventRepository loginEventRepository;

    @Transactional
    public void recordLogin(HttpServletRequest request, String email, String userId, boolean success, String failureReason) {
        try {
            String ipAddress = request.getHeader("X-Forwarded-For");
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
            }

            String userAgent = request.getHeader("User-Agent");
            String deviceType = "Desktop"; // Simplified parsing
            if (userAgent != null && (userAgent.toLowerCase().contains("mobile") || userAgent.toLowerCase().contains("android") || userAgent.toLowerCase().contains("iphone"))) {
                deviceType = "Mobile";
            }
            
            String browser = "Unknown";
            if (userAgent != null) {
                if (userAgent.contains("Chrome")) browser = "Chrome";
                else if (userAgent.contains("Firefox")) browser = "Firefox";
                else if (userAgent.contains("Safari")) browser = "Safari";
                else if (userAgent.contains("Edge")) browser = "Edge";
            }

            LoginEvent event = LoginEvent.builder()
                    .email(email)
                    .userId(userId)
                    .ipAddress(ipAddress)
                    .userAgent(userAgent)
                    .deviceType(deviceType)
                    .browser(browser)
                    .status(success ? "SUCCESSFUL" : "FAILED")
                    .failureReason(failureReason)
                    .build();

            loginEventRepository.save(event);
        } catch (Exception e) {
            log.error("Failed to record login event for email {}: {}", email, e.getMessage());
        }
    }

    public Page<LoginEvent> getLoginHistory(String email, String status, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return loginEventRepository.findWithFilters(email, status, startDate, endDate, pageable);
    }
}
