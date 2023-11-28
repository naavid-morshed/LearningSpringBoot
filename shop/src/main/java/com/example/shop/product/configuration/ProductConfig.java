package com.example.shop.product.configuration;

import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.ProductRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static java.time.Month.FEBRUARY;

@Configuration

public class ProductConfig {

    @Bean
    CommandLineRunner commandLineRunner(ProductRepo productRepo) {
        return args -> {
//            final Product product1 = new Product(
//                    "Kinesis Advantage 360",
//                    "Split Keyboard",
//                    465.00
//            );
//            final Product product2 = new Product(
//                    "793DX",
//                    "CPU",
//                    500.00
//            );
//            final Product product3 = new Product(
//                    "RTX 4090",
//                    "Graphics Processing Unit",
//                    1500.00
//            );

//            productRepo.saveAll(
//                    List.of(product1, product2, product3)
//            );
        };
    }
}
