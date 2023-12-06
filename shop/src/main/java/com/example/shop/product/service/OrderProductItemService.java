package com.example.shop.product.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.Model.OrderProductItemModel;
import com.example.shop.product.Model.ProductModel;
import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.OrderProductItemRepo;
import com.example.shop.product.repository.OrderRepo;
import com.example.shop.product.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductItemService {

    private final OrderProductItemRepo orderProductItemRepo;

    @Autowired
    public OrderProductItemService(OrderProductItemRepo orderProductItemRepo) {
        this.orderProductItemRepo = orderProductItemRepo;
    }

    public List<OrderProductItem> getOrderList() {
        return orderProductItemRepo.findAll();
    }
}
