package com.example.shop.product.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.OrderRepo;
import com.example.shop.product.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    public Order createOrder(OrderModel orderModel) {
//        Product product = productRepo.findById(product_id).orElseThrow(
//                () -> new RuntimeException("Product with ID: " + product_id + " does not exist")
//        );

        List<Product> productList = new ArrayList<>();
        for (Long id : orderModel.getId_list()) {
            productList.add(productRepo.findProductById(id));
        }

        Order newOrder = new Order(orderModel.getDeliveryAddress(), productList);
        return orderRepo.save(newOrder);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order addToOrder(Long order_id, Long product_id) {
        Order order = orderRepo.findById(order_id).orElseThrow(
                () -> new RuntimeException("Order with ID: " + order_id + " does not exist")
        );
        Product product = productRepo.findById(product_id).orElseThrow(
                () -> new RuntimeException("Product with ID: " + product_id + " does not exist")
        );

        order.getProductList().add(product);
        return orderRepo.save(order);
    }

    public Order removeFromOrder(Long order_id, Long product_id) {
        Order order = orderRepo.findById(order_id).orElseThrow(
                () -> new RuntimeException("Order with ID: " + order_id + " does not exist")
        );
        Product product = productRepo.findById(product_id).orElseThrow(
                () -> new RuntimeException("Product with ID: " + product_id + " does not exist")
        );
        order.getProductList().remove(product);
        return orderRepo.save(order);
    }

    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }

}
