package com.ecoculture.config;

import com.ecoculture.model.Destination;
import com.ecoculture.model.Product;
import com.ecoculture.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final DestinationRepository destinationRepository;
    private final ProductRepository productRepository;
    private final BookingRepository bookingRepository;
    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ItineraryRepository itineraryRepository;
    private final ItineraryItemRepository itineraryItemRepository;
    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    // Manual constructor to avoid Lombok issues in user environment
    public DataSeeder(
            DestinationRepository destinationRepository,
            ProductRepository productRepository,
            BookingRepository bookingRepository,
            ReviewRepository reviewRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ItineraryRepository itineraryRepository,
            ItineraryItemRepository itineraryItemRepository,
            ResourceLoader resourceLoader,
            ObjectMapper objectMapper) {
        this.destinationRepository = destinationRepository;
        this.productRepository = productRepository;
        this.bookingRepository = bookingRepository;
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.itineraryRepository = itineraryRepository;
        this.itineraryItemRepository = itineraryItemRepository;
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("🌱 Starting backend data seeding and synchronization...");
        
        try {
            // 1. Cleanup in correct order
            log.info("🧹 Cleaning up existing data...");
            orderItemRepository.deleteAll();
            orderRepository.deleteAll();
            bookingRepository.deleteAll();
            reviewRepository.deleteAll();
            itineraryItemRepository.deleteAll();
            itineraryRepository.deleteAll();
            productRepository.deleteAll();
            destinationRepository.deleteAll();

            // 2. Seed
            seedDestinations();
            seedProducts();
            
            log.info("✅ Backend seeding and synchronization completed successfully!");
        } catch (Exception e) {
            log.error("❌ ERROR DURING SEEDING: ", e);
            // Don't throw the exception here so the app can still start even if seeding fails
        }
    }

    private void seedDestinations() throws Exception {
        log.info("📍 Seeding destinations...");
        loadAndSaveDestinations("classpath:data/destinations_1.json");
        loadAndSaveDestinations("classpath:data/destinations_2.json");
    }

    private void seedProducts() throws Exception {
        log.info("🛍️ Seeding products...");
        loadAndSaveProducts("classpath:data/products_1.json");
        loadAndSaveProducts("classpath:data/products_2.json");
    }

    private void loadAndSaveDestinations(String path) throws Exception {
        Resource resource = resourceLoader.getResource(path);
        if (!resource.exists()) {
            log.warn("   ! File not found: {}", path);
            return;
        }
        try (InputStream inputStream = resource.getInputStream()) {
            List<Destination> destinations = objectMapper.readValue(inputStream, new TypeReference<List<Destination>>() {});
            destinationRepository.saveAll(destinations);
            log.info("   + Processed {} ({} items)", path, destinations.size());
        }
    }

    private void loadAndSaveProducts(String path) throws Exception {
        Resource resource = resourceLoader.getResource(path);
        if (!resource.exists()) {
            log.warn("   ! File not found: {}", path);
            return;
        }
        try (InputStream inputStream = resource.getInputStream()) {
            List<Product> products = objectMapper.readValue(inputStream, new TypeReference<List<Product>>() {});
            productRepository.saveAll(products);
            log.info("   + Processed {} ({} items)", path, products.size());
        }
    }
}
