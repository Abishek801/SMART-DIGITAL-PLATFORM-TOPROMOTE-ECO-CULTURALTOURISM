package com.ecoculture.service;

import com.ecoculture.model.Destination;
import com.ecoculture.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAllByOrderBySustainabilityScoreDesc();
    }

    public Destination getBySlug(String slug) {
        return destinationRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Destination not found: " + slug));
    }

    public List<Destination> getFeatured() {
        return destinationRepository.findByFeaturedTrue();
    }

    public List<Destination> getByCategory(String category) {
        return destinationRepository.findByCategory(
                Destination.Category.valueOf(category.toUpperCase())
        );
    }

    public List<Destination> search(String query) {
        return destinationRepository.searchByQuery(query);
    }

    public List<Destination> getByMinSustainabilityScore(int minScore) {
        return destinationRepository.findByMinSustainabilityScore(minScore);
    }
}
