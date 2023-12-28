//package com.example.shop.product.controller;
//
//import com.example.shop.product.Model.InventoryModel;
//import com.example.shop.product.Model.ProductModel;
//import com.example.shop.product.entity.Inventory;
//import com.example.shop.product.entity.Product;
//import com.example.shop.product.repository.InventoryRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequestMapping(path = "api/v1")
//@CrossOrigin("*")
//public class InventoryController {
//
//    @Autowired
//    private InventoryRepo inventoryRepo;
//
////    @GetMapping()
////    public List<InventoryModel> getProducts() {
////        List<InventoryModel> inventoryModels = new ArrayList<>();
////        for (Inventory inventory : inventoryRepo.findAll()) {
////            inventoryModels.add(new InventoryModel(inventory));
////        }
////        return inventoryModels;
////    }
//
//    @GetMapping("inventory")
//    public List<Inventory> getProducts() {
//        return inventoryRepo.findAll();
//    }
//}
