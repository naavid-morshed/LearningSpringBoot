package com.example.shop.product.entity;

import com.example.shop.product.Model.OrderProductItemModel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class OrderProductItem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "order_product_item_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public OrderProductItem(OrderProductItemModel orderProductItemModel) {
        this.price = orderProductItemModel.getPrice();
        this.order = new Order(orderProductItemModel.getOrderModel()); //
        this.product = new Product(orderProductItemModel.getProductModel());
    }
}
