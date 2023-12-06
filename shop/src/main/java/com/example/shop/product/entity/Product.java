package com.example.shop.product.entity;

import com.example.shop.product.Model.ProductModel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String specifications;
    private Double price;

    public Product(String name, String specifications, Double price) {
        this.name = name;
        this.specifications = specifications;
        this.price = price;
    }

    public Product(ProductModel productModel) {
        this.id = productModel.getId();
        this.name = productModel.getName();
        this.specifications = productModel.getSpecifications();
        this.price = productModel.getPrice();
    }
}
