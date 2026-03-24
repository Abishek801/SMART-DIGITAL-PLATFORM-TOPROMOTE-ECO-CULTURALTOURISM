package com.ecoculture.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.enabled:false}")
    private boolean mailEnabled;

    public void sendOtpEmail(String to, String otp) {
        if (!mailEnabled) {
            log.warn("[EmailService] Mail is disabled (spring.mail.enabled=false). OTP for {} is: {}", to, otp);
            return;
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("Your EcoCulture Security Code");

            String htmlContent = "<html><body style='font-family: Arial, sans-serif; background-color: #0c0a09; color: #f5f5f4; padding: 40px;'>" +
                    "<div style='max-width: 600px; margin: auto; background-color: #1c1917; padding: 40px; border-radius: 12px; border: 1px solid #4A8B5C;'>" +
                    "<h1 style='color: #4A8B5C; font-size: 24px; margin-bottom: 20px;'>EcoCulture Authentication</h1>" +
                    "<p style='font-size: 16px; margin-bottom: 30px;'>Use the code below to verify your identity. This code expires in 10 minutes.</p>" +
                    "<div style='background-color: #0c0a09; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #2d2a27;'>" +
                    "<span style='font-size: 48px; font-weight: bold; letter-spacing: 12px; color: #f5f5f4;'>" + otp + "</span>" +
                    "</div>" +
                    "<p style='font-size: 14px; margin-top: 30px; color: #78716c;'>If you didn't request this code, please ignore this email.</p>" +
                    "</div>" +
                    "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("[EmailService] OTP email sent to {}", to);
        } catch (Exception e) {
            log.error("[EmailService] Failed to send email to {}: {}", to, e.getMessage());
            // Do not throw — fail gracefully so login/register still works without SMTP
        }
    }
}

