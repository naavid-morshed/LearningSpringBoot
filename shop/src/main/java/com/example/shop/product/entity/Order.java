package com.example.shop.product.entity;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.Model.OrderProductItemModel;
import jakarta.persistence.*;
import lombok.*;

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
    // what is CascadeType?, mappedBy = "order_item",
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderProductItem> orderProductItemList = new ArrayList<>();

    public Order(OrderModel orderModel) {
        this.deliveryAddress = orderModel.getDeliveryAddress();
        for (OrderProductItemModel orderProductItemModel : orderModel.getOrderProductItemModelList()) {
            this.orderProductItemList.add(new OrderProductItem(orderProductItemModel)); //
        }
    }
}
