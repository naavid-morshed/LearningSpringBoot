package com.example.shop.product.controller;

import com.example.shop.product.entity.Product;
import com.example.shop.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/product")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("productId/{id}")
    public Optional<Product> getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("productName/{product}")
    public List<Product> getProductByName(@PathVariable String product) {
        return productService.getProductByName(product);
    }

    @PostMapping("addProduct")
    public Product addProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    @PostMapping("addProducts")
    public List<Product> addProducts(@RequestBody List<Product> productList) {
        return productService.saveProducts(productList);
    }

    @PutMapping("id/{id}")
    public Product updateProduct(
            @PathVariable("id") Long id,
            @RequestParam(required = false) String product,
            @RequestParam(required = false) String specifications,
            @RequestParam(required = false) Double price
    ) {
        return productService.updateProduct(id, product, specifications, price);
    }

    @DeleteMapping("id/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
