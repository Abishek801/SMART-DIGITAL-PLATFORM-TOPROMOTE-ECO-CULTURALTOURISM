package com.ecoculture.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Itinerary Controller
 *
 * Handles AI-generated itinerary generation and CRUD.
 * In production, the /generate endpoint would call an AI provider
 * (OpenAI GPT-4 / Google Gemini) with a structured prompt including:
 *   - Destination, duration, budget, travel style
 *   - User interests and carbon priority preference
 * And return a structured itinerary with per-activity carbon estimates.
 */
@RestController
@RequestMapping("/itineraries")
@RequiredArgsConstructor
public class ItineraryController {

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateItinerary(
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        // TODO: Integrate with AI provider (OpenAI / Gemini)
        // 1. Build system prompt with eco-travel constraints
        // 2. Call AI API with user preferences
        // 3. Parse structured JSON response
        // 4. Calculate carbon footprint per activity
        // 5. Save itinerary to database
        // 6. Return full itinerary with eco metrics

        return ResponseEntity.ok(Map.of(
            "message", "AI itinerary generation — connect your AI provider",
            "destination", request.getOrDefault("destination", ""),
            "status", "DRAFT"
        ));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Map<String, Object>>> getUserItineraries(
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        // TODO: Query itineraryRepository by userId
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getItinerary(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        // TODO: Fetch and validate ownership
        return ResponseEntity.ok(Map.of("id", id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        // TODO: Validate ownership then delete
        return ResponseEntity.noContent().build();
    }
}
