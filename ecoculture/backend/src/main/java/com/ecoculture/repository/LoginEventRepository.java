package com.ecoculture.repository;

import com.ecoculture.model.LoginEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface LoginEventRepository extends JpaRepository<LoginEvent, String> {

    @Query("SELECT l FROM LoginEvent l WHERE " +
           "(:email IS NULL OR LOWER(l.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
           "(:status IS NULL OR l.status = :status) AND " +
           "(:startDate IS NULL OR l.loginTime >= :startDate) AND " +
           "(:endDate IS NULL OR l.loginTime <= :endDate)")
    Page<LoginEvent> findWithFilters(
            @Param("email") String email,
            @Param("status") String status,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);
}
