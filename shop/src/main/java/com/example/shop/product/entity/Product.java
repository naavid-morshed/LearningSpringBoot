package com.example.shop.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String product;
    private String specifications;
    private Double price;

    public Product(String product, String specifications, Double price) {
        this.product = product;
        this.specifications = specifications;
        this.price = price;
    }
}
