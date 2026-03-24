package com.ecoculture.service;

import com.ecoculture.model.Booking;
import com.ecoculture.model.Destination;
import com.ecoculture.model.User;
import com.ecoculture.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingService {

    @PersistenceContext
    private EntityManager em;

    private final UserRepository userRepository;

    @Transactional
    public Map<String, Object> createBooking(String userEmail, Map<String, Object> request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String destinationId = (String) request.get("destinationId");
        Destination destination = em.find(Destination.class, destinationId);
        if (destination == null) throw new IllegalArgumentException("Destination not found: " + destinationId);

        String checkInStr  = (String) request.getOrDefault("checkIn",  LocalDateTime.now().plusDays(7).toString());
        String checkOutStr = (String) request.getOrDefault("checkOut", LocalDateTime.now().plusDays(14).toString());
        int guests = Integer.parseInt(request.getOrDefault("guests", "1").toString());
        String notes = (String) request.getOrDefault("notes", "");

        LocalDateTime checkIn  = LocalDateTime.parse(checkInStr.length() > 10 ? checkInStr : checkInStr + "T12:00:00");
        LocalDateTime checkOut = LocalDateTime.parse(checkOutStr.length() > 10 ? checkOutStr : checkOutStr + "T12:00:00");

        long nights = java.time.temporal.ChronoUnit.DAYS.between(checkIn, checkOut);
        double totalCost = destination.getAvgCost() * nights * guests;

        Booking booking = Booking.builder()
                .user(user)
                .destination(destination)
                .checkIn(checkIn)
                .checkOut(checkOut)
                .guests(guests)
                .totalCost(totalCost)
                .notes(notes)
                .status(Booking.BookingStatus.PENDING)
                .build();

        em.persist(booking);
        log.info("Booking created: {} -> {} ({})", userEmail, destination.getName(), booking.getId());

        return Map.of(
                "id", booking.getId(),
                "status", booking.getStatus().name(),
                "destination", destination.getName(),
                "checkIn", checkIn.toString(),
                "checkOut", checkOut.toString(),
                "guests", guests,
                "totalCost", totalCost,
                "message", "Booking created successfully"
        );
    }

    public List<Map<String, Object>> getUserBookings(String userEmail) {
        return em.createQuery(
                "SELECT b FROM Booking b WHERE b.user.email = :email ORDER BY b.createdAt DESC",
                Booking.class)
                .setParameter("email", userEmail)
                .getResultList()
                .stream()
                .map(b -> Map.<String, Object>of(
                        "id", b.getId(),
                        "destination", b.getDestination().getName(),
                        "destinationId", b.getDestination().getId(),
                        "checkIn", b.getCheckIn().toString(),
                        "checkOut", b.getCheckOut().toString(),
                        "guests", b.getGuests(),
                        "totalCost", b.getTotalCost(),
                        "status", b.getStatus().name()
                ))
                .toList();
    }

    @Transactional
    public Map<String, Object> cancelBooking(String id, String userEmail) {
        Booking booking = em.find(Booking.class, id);
        if (booking == null) throw new IllegalArgumentException("Booking not found");
        if (!booking.getUser().getEmail().equals(userEmail))
            throw new SecurityException("Not authorised to cancel this booking");
        if (booking.getStatus() == Booking.BookingStatus.CANCELLED)
            throw new IllegalStateException("Booking already cancelled");

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        log.info("Booking {} cancelled by {}", id, userEmail);
        return Map.of("id", id, "status", "CANCELLED");
    }

    @Transactional
    public Map<String, Object> confirmBooking(String id) {
        Booking booking = em.find(Booking.class, id);
        if (booking == null) throw new IllegalArgumentException("Booking not found");
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        log.info("Booking {} confirmed", id);
        return Map.of("id", id, "status", "CONFIRMED");
    }
}
