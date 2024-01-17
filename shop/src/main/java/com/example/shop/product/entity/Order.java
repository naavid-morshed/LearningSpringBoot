package com.example.shop.product.entity;

import com.example.shop.product.Model.OrderModel;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
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

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderProductItem> orderProductItemList = new ArrayList<>();

    public Order(OrderModel orderModel) {
        this.deliveryAddress = orderModel.getDeliveryAddress();
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", orderProductItemList=" + orderProductItemList +
                '}';
    }
}
