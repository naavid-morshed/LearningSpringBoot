//package com.example.shop.product.service;
//
//import com.example.shop.product.Model.OrderModel;
//import com.example.shop.product.Model.OrderProductItemModel;
//import com.example.shop.product.Model.ProductModel;
//import com.example.shop.product.entity.Order;
//import com.example.shop.product.entity.OrderProductItem;
//import com.example.shop.product.entity.Product;
//import com.example.shop.product.repository.OrderProductItemRepo;
//import com.example.shop.product.repository.OrderRepo;
//import com.example.shop.product.repository.ProductRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class OrderProductItemService {
//
//    private final OrderProductItemRepo orderProductItemRepo;
//    private final OrderRepo orderRepo;
//    private final ProductRepo productRepo;
//
//    @Autowired
//    public OrderProductItemService(OrderProductItemRepo orderProductItemRepo, OrderRepo orderRepo, ProductRepo productRepo) {
//        this.orderProductItemRepo = orderProductItemRepo;
//        this.orderRepo = orderRepo;
//        this.productRepo = productRepo;
//    }
//
//    public OrderProductItem createOrderProductItem(Long orderId, Long productId) {
//        Order order = orderRepo.findById(orderId).orElseThrow(
//                () -> new RuntimeException("Order with ID: " + orderId + " does not exist")
//        );
//
//        Product product = productRepo.findById(productId).orElseThrow(
//                () -> new RuntimeException("Order with ID: " + productId + " does not exist")
//        );
//
////        OrderModel orderModel = new OrderModel(order.getId(), order.getDeliveryAddress(), order.getOrderProductItemList());
////        ProductModel productModel = new ProductModel(product.getId(), product.getName(), product.getSpecifications(), product.getPrice());
//
//        OrderProductItem orderProductItem = new OrderProductItem(product.getPrice(), order, product);
//
////        OrderProductItemModel orderProductItemModel = new OrderProductItemModel(orderProductItem.getId(), productModel.getPrice(), orderModel,productModel);
//
//        order.getOrderProductItemList().add(orderProductItem);
//        orderRepo.save(order);
//
//        return orderProductItemRepo.save(orderProductItem);
//    }
//
//    public List<OrderProductItem> getOrderList() {
//        return orderProductItemRepo.findAll();
//    }
//}
