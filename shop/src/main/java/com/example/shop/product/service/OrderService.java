package com.example.shop.product.service;

import com.example.shop.product.Model.OrderModel;
import com.example.shop.product.Model.OrderProductItemModel;
import com.example.shop.product.entity.Inventory;
import com.example.shop.product.entity.Order;
import com.example.shop.product.entity.OrderProductItem;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.InventoryRepo;
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
    private final InventoryRepo inventoryRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo, OrderProductItemRepo orderProductItemRepo, InventoryRepo inventoryRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.orderProductItemRepo = orderProductItemRepo;
        this.inventoryRepo = inventoryRepo;
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

                orderProductItemRepo.save(orderProductItem);

                order.getOrderProductItemList().add(orderProductItem);

                inventory.setProductCount(inventory.getProductCount() - 1);
                inventoryRepo.save(inventory);
            } else {
                throw new RuntimeException("We ran out of stock : " + product.getName() + ", ID : " + product.getId());
            }

        }

        orderRepo.save(order);
        return new OrderModel(order);
    }

    public List<OrderModel> getAllOrders() {

        List<OrderModel> orderModels = new ArrayList<>();

        for (Order order : orderRepo.findAll()) {
            orderModels.add(new OrderModel(order));
        }
        return orderModels;
    }

    public Optional<OrderModel> getOrderById(Long id) {
        Order order = orderRepo.findById(id).orElseThrow(
                () -> new RuntimeException("Order by ID: " + id + " does not exist.")
        );
        System.err.println(order.getOrderProductItemList().getFirst().getProduct());
        return Optional.of(new OrderModel(order));
    }

    public OrderModel addProductToOrder(Long order_id, Long product_id) {
        Order order = orderRepo.findById(order_id).orElseThrow(
                () -> new RuntimeException("Order with ID: " + order_id + " does not exist")
        );

        Product product = productRepo.findById(product_id).orElseThrow(
                () -> new RuntimeException("Product with ID: " + product_id + " does not exist")
        );

        OrderProductItem orderProductItem = new OrderProductItem(order, product);
        orderProductItemRepo.save(orderProductItem);

        order.getOrderProductItemList().add(orderProductItem);
        orderRepo.save(order);
        return new OrderModel(order);
    }

    public OrderModel removeProductFromOrder(Long order_id, Long opi_id) {
        Order order = orderRepo.findById(order_id).orElseThrow(
                () -> new RuntimeException("Order with ID: " + order_id + " does not exist")
        );
        OrderProductItem orderProductItem = orderProductItemRepo.findById(opi_id).orElseThrow(
                () -> new RuntimeException("Product with ID: " + opi_id + " does not exist")
        );

        orderProductItemRepo.deleteById(opi_id);

        order.getOrderProductItemList().remove(orderProductItem);
        orderRepo.save(order);
        return new OrderModel(order);
    }

    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }
}
