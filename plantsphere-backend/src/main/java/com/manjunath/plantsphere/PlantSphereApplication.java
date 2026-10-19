package com.manjunath.plantsphere;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the PLANT SPHERE backend application.
 * 
 * @SpringBootApplication enables:
 * 1. @Configuration: Tags the class as a source of bean definitions.
 * 2. @EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings.
 * 3. @ComponentScan: Tells Spring to scan for components, configurations, and services in this package and sub-packages.
 */
@SpringBootApplication
public class PlantSphereApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlantSphereApplication.class, args);
    }
}
