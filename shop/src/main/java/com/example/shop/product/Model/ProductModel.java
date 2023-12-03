package com.example.shop.product.Model;

import com.example.shop.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductModel {
    private Long id;
    private String name;
    private String specifications;
    private Double price;

    public ProductModel(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.specifications = product.getSpecifications();
        this.price = product.getPrice();
    }
}
