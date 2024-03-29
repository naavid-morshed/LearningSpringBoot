package com.example.shop.product.Model;

import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.user.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderModel {
    private Long id;
    private String deliveryAddress;
    private List<OrderProductItemModel> orderProductItemModelList = new ArrayList<>();
    private UserModel userModel;

    public OrderModel(Order order) {
        this.id = order.getId();
        this.deliveryAddress = order.getDeliveryAddress();

        for (OrderProductItem orderProductItem : order.getOrderProductItemList()) {
            this.orderProductItemModelList.add(new OrderProductItemModel((orderProductItem)));
        }

        this.setUserModel(new UserModel(order.getUser()));
    }
}
