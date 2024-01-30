package com.example.shop.product.repository;

import com.example.shop.product.entity.Inventory;
import com.example.shop.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryRepo extends JpaRepository<Inventory, Long> {
    Inventory findInventoriesByProduct_Id(Long productId);

    @Query("select i.product from Inventory i where i.productCount > 0")
    List<Product> findProductsWhereInventoryCountIsNotZero();
}
