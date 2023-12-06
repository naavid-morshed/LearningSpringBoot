package com.example.shop.product.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.Model.OrderProductItemModel;
import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.OrderProductItemRepo;
import com.example.shop.product.repository.OrderRepo;
import com.example.shop.product.repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;
    private final OrderProductItemRepo orderProductItemRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo, OrderProductItemRepo orderProductItemRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.orderProductItemRepo = orderProductItemRepo;
    }

    @Transactional
    public OrderModel createOrder(OrderModel orderModel) {
        Order order = new Order(orderModel);
        orderRepo.save(order);
        System.err.println(order);

        for (OrderProductItemModel orderProductItemModel : orderModel.getOrderProductItemModelList()) {
            Product product = productRepo.findById(orderProductItemModel.getProductModel().getId())
                    .orElseThrow(() -> new RuntimeException("product not found"));

            OrderProductItem orderProductItem = new OrderProductItem(orderProductItemModel);
            orderProductItem.setProduct(product);
            orderProductItem.setOrder(order);
            orderProductItemRepo.save(orderProductItem);
        }

        orderRepo.save(order);
        return new OrderModel(order);
    }

    public List<Order> getAllOrders() {

//        List<OrderModel> orderModels = new ArrayList<>();
//
//        for (Order order : orders) {
//            orderModels.add(new OrderModel(order));
//        }

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
