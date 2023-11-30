package com.example.shop.product.repository;

import com.example.shop.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByName(String product);

    Product findProductById(Long id);
}
