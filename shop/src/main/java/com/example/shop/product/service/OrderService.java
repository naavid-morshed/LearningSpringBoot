package com.example.shop.product.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.Model.OrderProductItemModel;
import com.example.shop.product.Model.ProductModel;
import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.OrderRepo;
import com.example.shop.product.repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;

    // Create own service later?

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    @Transactional
    public Order createOrder(String address, List<Long> productIdList) {
        Order order = new Order(address, new ArrayList<OrderProductItem>());
//        OrderModel orderModel = new OrderModel(order);

        for (Long productId : productIdList) {
            Product product = productRepo.findById(productId).orElseThrow(
                    () -> new RuntimeException("Product with ID: " + productId + " does not exist")
            );

//            ProductModel productModel = new ProductModel(product);

            OrderProductItemModel orderProductItemModel = new OrderProductItemModel(order, product);

            OrderProductItem orderProductItem = new OrderProductItem(orderProductItemModel);

            order.getOrderProductItemList().add(orderProductItem);
        }
        return orderRepo.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

//    public Order addToOrder(Long order_id, Long opi_id) {
//        Order order = orderRepo.findById(order_id).orElseThrow(
//                () -> new RuntimeException("Order with ID: " + order_id + " does not exist")
//        );
//
//        OrderProductItem orderProductItem = orderProductItemRepo.findById(opi_id).orElseThrow(
//                () -> new RuntimeException("Order with ID: " + opi_id + " does not exist")
//        );
//
//        order.getOrderProductItemList().add(orderProductItem);
//        return orderRepo.save(order);
//    }

//    public Order removeFromOrder(Long order_id, Long opi_id) {
//        Order order = orderRepo.findById(order_id).orElseThrow(
//                () -> new RuntimeException("Order with ID: " + order_id + " does not exist")
//        );
//        OrderProductItem orderProductItem = orderProductItemRepo.findById(opi_id).orElseThrow(
//                () -> new RuntimeException("Product with ID: " + opi_id + " does not exist")
//        );
//        order.getOrderProductItemList().remove(orderProductItem);
//        return orderRepo.save(order);
//    }
//
//    public void deleteOrder(Long orderId) {
//        orderRepo.deleteById(orderId);
//    }
}
