package com.example.shop.product.controller;

import com.example.shop.product.entity.Order;
import com.example.shop.product.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/")
public class OrderController {
    public final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("order")
    public Order createOrder(@RequestParam String address, @RequestBody List<Long> productIdList) {
        try {
            return orderService.createOrder(address, productIdList);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new RuntimeException(exception.getMessage());
        }
    }

//    @DeleteMapping("order/{order_id}")
//    public void deleteOrder(@PathVariable Long order_id) {
//        try {
//            orderService.deleteOrder(order_id);
//        } catch (Exception exception) {
//            throw new RuntimeException(exception.getMessage());
//        }
//    }
//
//    @PutMapping("order/add/{order_id}")
//    public Order addToOrder(@PathVariable Long order_id, @RequestParam Long opi_id) {
//        try {
//            return orderService.addToOrder(order_id, opi_id);
//        } catch (Exception exception) {
//            throw new RuntimeException(exception.getMessage());
//        }
//    }
//
//    @PutMapping("order/remove/{order_id}")
//    public Order removeFromOrder(@PathVariable Long order_id, @RequestParam Long opi_id) {
//        try {
//            return orderService.removeFromOrder(order_id, opi_id);
//        } catch (Exception exception) {
//            throw new RuntimeException(exception.getMessage());
//        }
//    }

    @GetMapping("orders")
    public List<Order> getAllOrders() {
        try {
            return orderService.getAllOrders();
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }
}
