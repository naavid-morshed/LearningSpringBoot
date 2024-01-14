package com.example.shop.product.service;

import com.example.shop.product.Model.InventoryModel;
import com.example.shop.product.entity.Inventory;
import com.example.shop.product.repository.InventoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {
    private final InventoryRepo inventoryRepo;

    @Autowired
    public InventoryService(InventoryRepo inventoryRepo) {
        this.inventoryRepo = inventoryRepo;
    }


    public List<InventoryModel> getInventory() {
        List<Inventory> inventoryList = inventoryRepo.findAll();
        List<InventoryModel> inventoryModelList = new ArrayList<>();

        for (Inventory inventory : inventoryList) {
            inventoryModelList.add(new InventoryModel(inventory));
        }

        return inventoryModelList;
    }

    public InventoryModel getInventoryById(Long id) {
        Inventory inventory = inventoryRepo.findById(id).orElseThrow(
                () -> new RuntimeException("Inventory by id: " + id + " does not exist.")
        );
        return new InventoryModel(inventory);
    }

    public InventoryModel increaseInventory(Long id){
        Inventory inventory = inventoryRepo.findById(id).orElseThrow(
                () -> new RuntimeException("Inventory by id: " + id + " does not exist.")
        );
        inventory.setProductCount(inventory.getProductCount() + 1);
        inventoryRepo.save(inventory);

        return new InventoryModel(inventory);
    }
}
