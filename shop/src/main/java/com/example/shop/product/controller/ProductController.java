package com.example.shop.product.controller;

import com.example.shop.product.Model.ProductModel;
import com.example.shop.product.service.InventoryService;
import com.example.shop.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/product")
@CrossOrigin("*")
public class ProductController {
    private final ProductService productService;
    private final InventoryService inventoryService;

    @Autowired
    public ProductController(ProductService productService, InventoryService inventoryService) {
        this.productService = productService;
        this.inventoryService = inventoryService;
    }

    @GetMapping()
    public ResponseEntity<Optional<List<ProductModel>>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("productId/{id}")
    public ResponseEntity<Optional<ProductModel>> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("getListOfProducts")
    public List<ProductModel> getListOfProductById(@RequestParam List<Long> idList) {
        List<ProductModel> productModelList = new ArrayList<>();

        for (Long id : idList) {
            productModelList.add(productService.getSingleProductById(id));
        }

        return productModelList;
    }

    @GetMapping("productName/{productName}")
    public List<ProductModel> getProductByName(@PathVariable String productName) {
        return productService.getProductByName(productName);
    }

    @PostMapping("addProduct")
    public ResponseEntity<Optional<ProductModel>> addProduct(@RequestBody ProductModel productModel) {
        return ResponseEntity.ok(productService.addProduct(productModel));
    }

    @PostMapping("addProducts")
    public ResponseEntity<Optional<List<ProductModel>>> addMultipleProducts(@RequestBody List<ProductModel> productList) {
        return ResponseEntity.ok(productService.addMultipleProducts(productList));
    }

    @PutMapping("update")
    public ProductModel updateProduct(@RequestBody ProductModel productModel) {
        return productService.updateProduct(productModel);
    }

    @DeleteMapping("id/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
