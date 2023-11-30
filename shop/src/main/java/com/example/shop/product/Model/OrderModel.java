package com.example.shop.product.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderModel {
    String deliveryAddress;
    private List<Long> id_list;
}
