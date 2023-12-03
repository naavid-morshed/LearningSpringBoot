package com.example.shop.product.Model;

import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductItemModel {
    private Long id;
    private Double price;
    private Order order;
    private Product product;
}
