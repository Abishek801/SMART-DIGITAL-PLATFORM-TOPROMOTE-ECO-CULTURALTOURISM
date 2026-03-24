package com.ecoculture.repository;

import com.ecoculture.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, String> {

    Optional<Destination> findBySlug(String slug);

    List<Destination> findByFeaturedTrue();

    List<Destination> findByCategory(Destination.Category category);

    @Query("SELECT d FROM Destination d WHERE " +
           "LOWER(d.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.region) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(d.country) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Destination> searchByQuery(String query);

    @Query("SELECT d FROM Destination d WHERE d.sustainabilityScore >= :minScore ORDER BY d.sustainabilityScore DESC")
    List<Destination> findByMinSustainabilityScore(int minScore);

    List<Destination> findAllByOrderBySustainabilityScoreDesc();
}
