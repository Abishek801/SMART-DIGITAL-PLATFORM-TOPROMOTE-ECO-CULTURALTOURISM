package com.ecoculture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EcoCultureApplication {
    public static void main(String[] args) {
        SpringApplication.run(EcoCultureApplication.class, args);
    }
}
