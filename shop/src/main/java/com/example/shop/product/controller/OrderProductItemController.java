package com.example.shop.product.controller;

import com.example.shop.product.Model.OrderProductItemModel;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.product.service.OrderProductItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/")
public class OrderProductItemController {

    private final OrderProductItemService orderProductItemService;

    @Autowired
    public OrderProductItemController(OrderProductItemService orderProductItemService) {
        this.orderProductItemService = orderProductItemService;
    }

    @GetMapping("opi_item_list")
    public List<OrderProductItem> getOrderList(){
        try {
            return orderProductItemService.getOrderList();
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }
}
