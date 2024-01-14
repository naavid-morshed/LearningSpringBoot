package com.example.shop.product.repository;

import com.example.shop.product.entity.OrderProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductItemRepo extends JpaRepository<OrderProductItem, Long> {
}
