package com.example.shop.product.configuration;

import com.example.shop.product.entity.Inventory;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.InventoryRepo;
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
    CommandLineRunner commandLineRunner(ProductRepo productRepo, InventoryRepo inventoryRepo) {
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
//
//            Inventory in1 = new Inventory();
//            Inventory in2 = new Inventory();
//            Inventory in3 = new Inventory();
//
//            in1.setProductCount(1);
//            in2.setProductCount(1);
//            in3.setProductCount(1);
//
//            productRepo.saveAll(
//                    List.of(product1, product2, product3)
//            );
//
//            in1.setProduct(product1);
//            in2.setProduct(product2);
//            in3.setProduct(product3);
//
//            inventoryRepo.saveAll(
//                    List.of(in1, in2, in3)
//            );
        };
    }
}
