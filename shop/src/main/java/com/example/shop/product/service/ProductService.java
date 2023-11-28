package com.example.shop.product.service;

import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepo repo;

    @Autowired
    public ProductService(ProductRepo repo) {
        this.repo = repo;
    }

    public List<Product> getProducts() {
        return repo.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return repo.findById(id);
    }

    public List<Product> getProductByName(String product) {
        return repo.findByProduct(product);
    }

    public Product saveProduct(Product product) {
        return repo.save(product);
    }

    public List<Product> saveProducts(List<Product> products) {
        return repo.saveAll(products);
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public Product updateProduct(Long id, String product, String specifications, Double price) {
        Product existingProduct = repo.findById(id).orElseThrow(
                () -> new IllegalStateException("Task with ID: " + id + " does not exist")
        );
        try {
            if (product != null && !product.isEmpty() ) {
                existingProduct.setProduct(product);
            }
            if (specifications != null && !specifications.isEmpty()) existingProduct.setSpecifications(specifications);
            if (price!= null && price != 0) existingProduct.setPrice(price);
            return repo.save(existingProduct);
        } catch (Exception exception) {
            throw new IllegalStateException(exception.getMessage());
        }
    }
}
