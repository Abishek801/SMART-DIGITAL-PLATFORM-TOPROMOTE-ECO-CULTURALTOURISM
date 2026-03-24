package com.ecoculture.controller;

import com.ecoculture.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBooking(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        Map<String, Object> result = bookingService.createBooking(currentUser.getUsername(), request);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getUserBookings(
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        return ResponseEntity.ok(bookingService.getUserBookings(currentUser.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBooking(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        return ResponseEntity.ok(Map.of("id", id));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Map<String, Object>> cancelBooking(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, currentUser.getUsername()));
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<Map<String, Object>> confirmBooking(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        return ResponseEntity.ok(bookingService.confirmBooking(id));
    }
}
