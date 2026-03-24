package com.ecoculture.service;

import com.ecoculture.dto.AuthDtos.*;
import com.ecoculture.model.OtpCode;
import com.ecoculture.model.User;
import com.ecoculture.repository.UserRepository;
import com.ecoculture.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final OtpService otpService;
    private final EmailService emailService;
    private final jakarta.servlet.http.HttpServletRequest httpRequest;
    private final LoginEventService loginEventService;

    @Value("${security.max-login-attempts}")
    private int maxLoginAttempts;

    @Value("${security.lockout-duration-minutes}")
    private int lockoutDurationMinutes;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.TRAVELER)
                .emailVerified(true) // Simplified; add email verification in production
                .build();

        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        log.info("New user registered: {}", user.getEmail());
        return new AuthResponse(accessToken, refreshToken, new UserDto(user));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (user.isLocked()) {
            throw new LockedException("Account is temporarily locked. Try again later.");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            handleFailedLogin(user);
            loginEventService.recordLogin(httpRequest, request.getEmail(), user.getId(), false, "Invalid email or password");
            throw new BadCredentialsException("Invalid email or password");
        }

        // Reset login attempts on success
        user.setLoginAttempts(0);
        user.setLockedUntil(null);
        userRepository.save(user);

        // Check for 2FA
        if (user.isTwoFactorEnabled() || user.getRole() == User.Role.SUPER_ADMIN || user.getRole() == User.Role.ADMIN) {
            String otp = otpService.generateOtp(user.getEmail(), OtpCode.OtpType.LOGIN);
            emailService.sendOtpEmail(user.getEmail(), otp);
            log.info("2FA required for user: {}. OTP sent.", user.getEmail());
            return new AuthResponse(true, user.getEmail());
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        log.info("User logged in: {}", user.getEmail());
        loginEventService.recordLogin(httpRequest, user.getEmail(), user.getId(), true, null);
        return new AuthResponse(accessToken, refreshToken, new UserDto(user));
    }

    @Transactional
    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        boolean isValid = otpService.verifyOtp(request.getEmail(), request.getCode(), OtpCode.OtpType.LOGIN);

        if (!isValid) {
            throw new BadCredentialsException("Invalid or expired OTP");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        log.info("User verified OTP and logged in: {}", user.getEmail());
        loginEventService.recordLogin(httpRequest, user.getEmail(), user.getId(), true, null);
        return new AuthResponse(accessToken, refreshToken, new UserDto(user));
    }

    private void handleFailedLogin(User user) {
        int attempts = user.getLoginAttempts() + 1;
        user.setLoginAttempts(attempts);

        if (attempts >= maxLoginAttempts) {
            user.setLockedUntil(LocalDateTime.now().plusMinutes(lockoutDurationMinutes));
            log.warn("Account locked for user: {} after {} failed attempts", user.getEmail(), attempts);
        }

        userRepository.save(user);
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String userEmail = jwtService.extractUsername(request.getRefreshToken());
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        if (!jwtService.isTokenValid(request.getRefreshToken(), userDetails)) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        String newAccessToken = jwtService.generateToken(userDetails);
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        return new AuthResponse(newAccessToken, request.getRefreshToken(), new UserDto(user));
    }
}
