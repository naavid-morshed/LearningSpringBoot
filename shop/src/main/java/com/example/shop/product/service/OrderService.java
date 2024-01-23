package com.example.shop.product.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.Model.OrderModelWithoutUser;
import com.example.shop.product.Model.OrderProductItemModel;
import com.example.shop.product.entity.Inventory;
import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.InventoryRepo;
import com.example.shop.product.repository.OrderProductItemRepo;
import com.example.shop.product.repository.OrderRepo;
import com.example.shop.product.repository.ProductRepo;
import com.example.shop.user.Entity.User;
import com.example.shop.user.model.UserModel;
import com.example.shop.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;
    private final OrderProductItemRepo orderProductItemRepo;
    private final InventoryRepo inventoryRepo;
    private final UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo, OrderProductItemRepo orderProductItemRepo, InventoryRepo inventoryRepo, UserRepository userRepository) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.orderProductItemRepo = orderProductItemRepo;
        this.inventoryRepo = inventoryRepo;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderModel createOrder(OrderModel orderModel) {
        Order order = new Order(orderModel);

        for (OrderProductItemModel orderProductItemModel : orderModel.getOrderProductItemModelList()) {
            Product product = productRepo.findById(orderProductItemModel.getProductModel().getId()).orElseThrow(() -> new RuntimeException("product not found"));

            Inventory inventory = inventoryRepo.findInventoriesByProduct_Id(product.getId());

            if (inventory.getProductCount() > 0) {
                OrderProductItem orderProductItem = new OrderProductItem(orderProductItemModel);
                orderProductItem.setProduct(product);
                orderProductItem.setOrder(order);

//                orderProductItemRepo.save(orderProductItem);

                order.getOrderProductItemList().add(orderProductItem);

                inventory.setProductCount(inventory.getProductCount() - 1);
                inventoryRepo.save(inventory);
            } else {
                throw new RuntimeException("We ran out of stock : " + product.getName() + ", ID : " + product.getId());
            }

        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String email = authentication.getName();

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new RuntimeException("asdf")
            );

            System.err.println(new UserModel(user));

            order.setUser(user);
            orderRepo.save(order);
            return new OrderModel(order);
        } else {
            return new OrderModel();
        }

    }

    public Optional<List<OrderModel>> getAllOrders() {
        return Optional.of(orderRepo.findAll().stream().map(OrderModel::new).collect(Collectors.toList()));
    }

    public Optional<OrderModel> getOrderById(Long id) {
        return Optional.of(new OrderModel(orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order by ID: " + id + " does not exist."))));
    }

    public Optional<OrderModel> addProductToOrder(Long order_id, Long product_id) {
        Order order = orderRepo.findById(order_id).orElseThrow(() -> new RuntimeException("Order with ID: " + order_id + " does not exist"));

        Product product = productRepo.findById(product_id).orElseThrow(() -> new RuntimeException("Product with ID: " + product_id + " does not exist"));

        OrderProductItem orderProductItem = new OrderProductItem(order, product);
        orderProductItemRepo.save(orderProductItem);

        order.getOrderProductItemList().add(orderProductItem);
        orderRepo.save(order);
        return Optional.of(new OrderModel(order));
    }

    public OrderModel removeProductFromOrder(Long order_id, Long opi_id) {
        Order order = orderRepo.findById(order_id).orElseThrow(() -> new RuntimeException("Order with ID: " + order_id + " does not exist"));
        OrderProductItem orderProductItem = orderProductItemRepo.findById(opi_id).orElseThrow(() -> new RuntimeException("Product with ID: " + opi_id + " does not exist"));

        orderProductItemRepo.deleteById(opi_id);

        order.getOrderProductItemList().remove(orderProductItem);
        orderRepo.save(order);
        return new OrderModel(order);
    }

    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }

    public Optional<List<OrderModelWithoutUser>> getOrderByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String email = authentication.getName();

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new RuntimeException("asdf")
            );

            List<Order> orders = orderRepo.findOrdersByUser(user);
            List<OrderModelWithoutUser> orderModels = new ArrayList<>();

            for(Order order: orders){
                orderModels.add(new OrderModelWithoutUser(order));
            }

            return Optional.of(orderModels);
        } else {
            return Optional.of(new ArrayList<>());
        }
    }
}
