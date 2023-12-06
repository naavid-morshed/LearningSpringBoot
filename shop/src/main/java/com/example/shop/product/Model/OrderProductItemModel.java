package com.example.shop.product.Model;

import com.example.shop.product.entity.OrderProductItem;
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
    private OrderModel orderModel;
    private ProductModel productModel;

    public OrderProductItemModel(OrderProductItem orderProductItem) {
        this.id = orderProductItem.getId();
        this.price = orderProductItem.getPrice();
        this.orderModel = new OrderModel(orderProductItem.getOrder());
        this.productModel = new ProductModel(orderProductItem.getProduct());
    }

    public OrderProductItemModel(OrderModel orderModel, ProductModel productModel) {
        this.price = productModel.getPrice();
        this.orderModel = orderModel;
        this.productModel = productModel;
    }
}
