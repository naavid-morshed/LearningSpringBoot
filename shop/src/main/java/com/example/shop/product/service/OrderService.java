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
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;
    private final OrderProductItemRepo orderProductItemRepo;

    // Create own service later?

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo,
                        OrderProductItemRepo orderProductItemRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.orderProductItemRepo = orderProductItemRepo;
    }

    @Transactional
    public Order createOrder(String address, List<Long> productIdList) {

        OrderModel orderModel = new OrderModel();
        orderModel.setDeliveryAddress(address);
        for (Long productId : productIdList) {

            Product product = productRepo.findById(productId).orElseThrow(
                    () -> new RuntimeException("Product with ID: " + productId + " does not exist")
            );

            ProductModel productModel = new ProductModel(product);

            OrderProductItemModel orderProductItemModel = new OrderProductItemModel(orderModel,productModel);

//            OrderProductItem orderProductItem = new OrderProductItem(orderProductItemModel);

            orderModel.getOrderProductItemModelList().add(orderProductItemModel);

        }
        return orderRepo.save(new Order(orderModel));
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
