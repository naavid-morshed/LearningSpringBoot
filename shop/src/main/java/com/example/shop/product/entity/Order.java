package com.example.shop.product.entity;

import com.example.shop.product.Model.OrderModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "order_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String deliveryAddress;
    // what is CascadeType?
    @OneToMany
    private List<OrderProductItem> orderProductItemList;

    public Order(String deliveryAddress, List<OrderProductItem> orderProductItemList) {
        this.deliveryAddress = deliveryAddress;
        this.orderProductItemList = orderProductItemList;
    }

    public Order(OrderModel order) {
        this.id = order.getId();
        this.deliveryAddress = order.getDeliveryAddress();
        this.orderProductItemList = order.getOrderProductItemList();
    }
}
