package com.example.shop.product.controller;

import com.example.shop.product.Model.ProductModel;
import com.example.shop.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/product")
@CrossOrigin("*")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public List<ProductModel> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("productId/{id}")
    public Optional<ProductModel> getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
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
    public ProductModel addProduct(@RequestBody ProductModel productModel) {
        return productService.addProduct(productModel);
    }

    @PostMapping("addProducts")
    public List<ProductModel> addMultipleProducts(@RequestBody List<ProductModel> productList) {
        return productService.addMultipleProducts(productList);
    }

    @PutMapping("update")
    public ProductModel updateProduct(@RequestBody ProductModel productModel) {
        return productService.updateProduct(productModel);
    }

//    @DeleteMapping("id/{id}")
//    public void deleteProduct(@PathVariable Long id) {
//        productService.deleteProduct(id);
//    }
}
