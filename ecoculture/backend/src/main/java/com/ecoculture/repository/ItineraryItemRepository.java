package com.ecoculture.repository;

import com.ecoculture.model.ItineraryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItineraryItemRepository extends JpaRepository<ItineraryItem, String> {
}
