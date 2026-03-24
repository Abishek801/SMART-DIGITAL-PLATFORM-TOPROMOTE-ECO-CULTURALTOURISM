package com.ecoculture.controller;

import com.ecoculture.dto.AuthDtos.UserDto;
import com.ecoculture.model.User;
import com.ecoculture.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getProfile(@AuthenticationPrincipal UserDetails currentUser) {
        User user = userRepository.findByEmail(currentUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(new UserDto(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateProfile(
            @RequestBody Map<String, String> updates,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        User user = userRepository.findByEmail(currentUser.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updates.containsKey("name")) user.setName(updates.get("name"));
        if (updates.containsKey("image")) user.setImage(updates.get("image"));

        userRepository.save(user);
        return ResponseEntity.ok(new UserDto(user));
    }

    @GetMapping("/me/saved-destinations")
    public ResponseEntity<?> getSavedDestinations(@AuthenticationPrincipal UserDetails currentUser) {
        // TODO: Query SavedDestination join table for user
        return ResponseEntity.ok(java.util.List.of());
    }

    @PostMapping("/me/saved-destinations/{destinationId}")
    public ResponseEntity<Map<String, String>> saveDestination(
            @PathVariable String destinationId,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        // TODO: Upsert SavedDestination record
        return ResponseEntity.ok(Map.of("message", "Destination saved"));
    }

    @DeleteMapping("/me/saved-destinations/{destinationId}")
    public ResponseEntity<Void> unsaveDestination(
            @PathVariable String destinationId,
            @AuthenticationPrincipal UserDetails currentUser
    ) {
        // TODO: Delete SavedDestination record
        return ResponseEntity.noContent().build();
    }
}
