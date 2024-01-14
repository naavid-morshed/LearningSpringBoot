package com.example.shop.product.controller;

import com.example.shop.product.Model.InventoryModel;
import com.example.shop.product.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/inventory")
@CrossOrigin("*")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping()
    public List<InventoryModel> getInventory() {
        return inventoryService.getInventory();
    }

    @GetMapping("getInventory/{id}")
    public InventoryModel getInventoryById(@PathVariable Long id){
        return inventoryService.getInventoryById(id);
    }

    @PostMapping("{id}")
    public InventoryModel increaseInventory(@PathVariable Long id){
        return inventoryService.increaseInventory(id);
    }
}
