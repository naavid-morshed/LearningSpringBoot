package com.example.shop.product.repository;

import com.example.shop.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByName(String product);

    Product findProductById(Long id);
    Product findProductByName(String name);

    Boolean existsProductByProductCode(String productCode);

    @Query("SELECT p FROM Product p WHERE " +
            "p.name LIKE CONCAT('%',:query, '%')" +
            "Or p.specifications LIKE CONCAT('%', :query, '%')")
    List<Product> searchProducts(String query);
}
