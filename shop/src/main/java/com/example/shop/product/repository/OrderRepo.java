package com.example.shop.product.repository;

import com.example.shop.product.entity.Order;
import com.example.shop.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findOrdersByUser(User user);
}
