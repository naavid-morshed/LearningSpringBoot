package com.example.shop.product.Model;

import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
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

    public OrderProductItemModel(OrderProductItem orderProductItem) {
        this.id = orderProductItem.getId();
        this.price = orderProductItem.getPrice();
        this.order = orderProductItem.getOrder();
        this.product = orderProductItem.getProduct();
    }

    public OrderProductItemModel(Order order, Product product) {
        this.id = product.getId();
        this.price = product.getPrice();
        this.order = order;
        this.product = product;
    }
}
