package com.ecoculture.controller;

import com.ecoculture.model.Destination;
import com.ecoculture.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/destinations")
@RequiredArgsConstructor
public class DestinationController {

    private final DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<Destination>> getAll(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Integer minScore
    ) {
        if (featured != null && featured) {
            return ResponseEntity.ok(destinationService.getFeatured());
        }
        if (category != null) {
            return ResponseEntity.ok(destinationService.getByCategory(category));
        }
        if (minScore != null) {
            return ResponseEntity.ok(destinationService.getByMinSustainabilityScore(minScore));
        }
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Destination> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(destinationService.getBySlug(slug));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Destination>> search(@RequestParam String q) {
        return ResponseEntity.ok(destinationService.search(q));
    }
}
