package com.ecoculture.repository;

import com.ecoculture.model.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OtpCode, String> {
    Optional<OtpCode> findTopByIdentifierAndTypeOrderByCreatedAtDesc(String identifier, OtpCode.OtpType type);
    void deleteByIdentifier(String identifier);
}
