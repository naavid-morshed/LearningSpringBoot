package com.example.shop.product.repository;

import com.example.shop.product.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepo extends JpaRepository<Inventory, Long> {
    Inventory findInventoriesByProduct_Id(Long productId);
}
