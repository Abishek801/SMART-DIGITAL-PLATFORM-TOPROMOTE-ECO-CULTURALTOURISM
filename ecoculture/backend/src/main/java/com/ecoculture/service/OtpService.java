package com.ecoculture.service;

import com.ecoculture.model.OtpCode;
import com.ecoculture.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private static final int OTP_EXPIRY_MINUTES = 10;
    private static final int MAX_ATTEMPTS = 3;

    @Transactional
    public String generateOtp(String identifier, OtpCode.OtpType type) {
        // Delete previous OTPs for this identifier
        otpRepository.deleteByIdentifier(identifier);

        // Generate 6-digit random code
        String code = String.format("%06d", new SecureRandom().nextInt(1000000));
        
        OtpCode otpCode = OtpCode.builder()
                .identifier(identifier)
                .hashedCode(passwordEncoder.encode(code))
                .type(type)
                .expiresAt(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES))
                .build();

        otpRepository.save(otpCode);
        return code; // Return plain code to be sent via email/SMS
    }

    @Transactional
    public boolean verifyOtp(String identifier, String code, OtpCode.OtpType type) {
        Optional<OtpCode> otpOpt = otpRepository.findTopByIdentifierAndTypeOrderByCreatedAtDesc(identifier, type);

        if (otpOpt.isEmpty()) return false;

        OtpCode otp = otpOpt.get();

        if (otp.isVerified() || otp.isExpired() || otp.getAttempts() >= MAX_ATTEMPTS) {
            return false;
        }

        boolean matches = passwordEncoder.matches(code, otp.getHashedCode());
        
        if (matches) {
            otp.setVerified(true);
            otpRepository.save(otp);
            return true;
        } else {
            otp.setAttempts(otp.getAttempts() + 1);
            otpRepository.save(otp);
            return false;
        }
    }
}
