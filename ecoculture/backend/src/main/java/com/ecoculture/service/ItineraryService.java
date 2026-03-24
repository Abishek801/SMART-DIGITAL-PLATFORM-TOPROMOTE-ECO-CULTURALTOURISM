package com.ecoculture.service;

import com.ecoculture.model.Itinerary;
import com.ecoculture.model.User;
import com.ecoculture.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ItineraryService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public Map<String, Object> generateItinerary(String userEmail, Map<String, Object> request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String title = "Eco-Journey to " + request.getOrDefault("destination", "Unknown");
        String destination = (String) request.getOrDefault("destination", "");
        String notes = (String) request.getOrDefault("preferences", "");

        Itinerary itinerary = Itinerary.builder()
                .user(user)
                .title(title)
                .destination(destination)
                .travelStyle(notes)
                .build();

        em.persist(itinerary);
        log.info("Itinerary created for {}: {}", userEmail, itinerary.getId());

        return Map.of(
                "id", itinerary.getId(),
                "title", itinerary.getTitle(),
                "destination", itinerary.getDestination(),
                "status", "DRAFT",
                "message", "Itinerary saved — connect an AI provider to auto-generate activity days."
        );
    }

    public List<Map<String, Object>> getUserItineraries(String userEmail) {
        return em.createQuery(
                "SELECT i FROM Itinerary i WHERE i.user.email = :email ORDER BY i.createdAt DESC",
                Itinerary.class)
                .setParameter("email", userEmail)
                .getResultList()
                .stream()
                .map(i -> Map.<String, Object>of(
                        "id", i.getId(),
                        "title", i.getTitle(),
                        "destination", i.getDestination(),
                        "createdAt", i.getCreatedAt().toString()
                ))
                .toList();
    }

    @Transactional
    public void deleteItinerary(String id, String userEmail) {
        Itinerary it = em.find(Itinerary.class, id);
        if (it == null) throw new IllegalArgumentException("Itinerary not found");
        if (!it.getUser().getEmail().equals(userEmail))
            throw new SecurityException("Not authorised to delete this itinerary");
        em.remove(it);
        log.info("Itinerary {} deleted by {}", id, userEmail);
    }
}
