package com.example.shop.product.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity @Table(name = "order_item")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String deliveryAddress;
    // what is CascadeType?
    @OneToMany
    private List<Product> productList;

//    @OneToMany
//    private List<OrderProductItem> orderProductItemList;

    public Order(String deliveryAddress, List<Product> productList) {
        this.deliveryAddress = deliveryAddress;
        this.productList = productList;
    }
}
