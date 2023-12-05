package com.example.shop.product.Model;

import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderModel {
    private Long id;
    private String deliveryAddress;
    private List<OrderProductItem> orderProductItemList;

    public OrderModel(Order order) {
        this.id = order.getId();
        this.deliveryAddress = order.getDeliveryAddress();
        this.orderProductItemList = order.getOrderProductItemList();
    }
}