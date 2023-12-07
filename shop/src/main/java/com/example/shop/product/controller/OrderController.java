package com.example.shop.product.controller;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.entity.Order;
import com.example.shop.product.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public OrderModel createOrder(@RequestBody OrderModel orderModel) {
        try {
            return orderService.createOrder(orderModel);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new RuntimeException(exception.getMessage());
        }
    }

    @DeleteMapping("order/{order_id}")
    public void deleteOrder(@PathVariable Long order_id) {
        try {
            orderService.deleteOrder(order_id);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    @PutMapping("order/add/{order_id}/product_id/{product_id}")
    public OrderModel addProductToOrder(@PathVariable Long order_id, @PathVariable Long product_id) {
        try {
            return orderService.addProductToOrder(order_id, product_id);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    @PutMapping("order/remove/{order_id}/opi_id/{opi_id}")
    public ResponseEntity<OrderModel> removeProductFromOrder(@PathVariable Long order_id, @PathVariable Long opi_id) {
        try {
            return ResponseEntity.ok(orderService.removeProductFromOrder(order_id, opi_id));
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    @GetMapping("orders")
    public ResponseEntity<List<OrderModel>> getAllOrders() {
        try {
            return ResponseEntity.ok(orderService.getAllOrders());
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    @GetMapping("order/id/{id}")
    public ResponseEntity<Optional<OrderModel>> getOrderById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(orderService.getOrderById(id));
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }
}
