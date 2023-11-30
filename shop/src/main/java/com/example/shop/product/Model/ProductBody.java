package com.example.shop.product.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class ProductBody {
    private String name;
    private String specifications;
    private Double price;
}
