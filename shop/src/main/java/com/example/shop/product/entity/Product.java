package com.example.shop.product.entity;

import com.example.shop.product.Model.ProductModel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String specifications;
    private Double price;

    @Column(unique = true, nullable = false)
    private String productCode;

    public Product(ProductModel productModel) {
        this.id = productModel.getId();
        this.name = productModel.getName();
        this.specifications = productModel.getSpecifications();
        this.price = productModel.getPrice();
    }

    // using this in config, otherwise not necessary
    public Product(String name, String specifications, Double price, String productCode) {
        this.name = name;
        this.specifications = specifications;
        this.price = price;
        this.productCode = productCode;
    }
}
