package com.ecoculture.service;

import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SmsService {

    // Mock implementation for demo. In production, integrate with Twilio/MSG91.
    public void sendOtpSms(String phone, String otp) {
        log.info("Sending OTP {} to phone {}", otp, phone);
        // Add Twilio/MSG91 logic here
        System.out.println("SMS SENT TO " + phone + ": " + otp);
    }
}
