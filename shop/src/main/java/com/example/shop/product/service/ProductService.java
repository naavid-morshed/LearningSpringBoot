package com.example.shop.product.service;

import com.example.shop.product.Model.ProductBody;
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
        return repo.findByName(product);
    }

    public Product saveProduct(ProductBody productBody) {
        Product newProduct = new Product(productBody.getName(), productBody.getSpecifications(), productBody.getPrice());
        return repo.save(newProduct);
    }

    public List<Product> saveProducts(List<Product> products) {
        return repo.saveAll(products);
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public Product updateProduct(Long id, ProductBody productBody) {

        try {
            Product toBeUpDatedProduct = repo.findProductById(id);
            if (toBeUpDatedProduct == null) {
                throw new RuntimeException("Product with ID: " + id + " does not exist");
            }
            if (productBody.getName() != null) {
                toBeUpDatedProduct.setName(productBody.getName());
            }
            if (productBody.getSpecifications() != null) {
                toBeUpDatedProduct.setSpecifications(productBody.getSpecifications());
            }
            if (productBody.getPrice() != null) {
                toBeUpDatedProduct.setPrice(productBody.getPrice());
            }

            repo.save(toBeUpDatedProduct);
            return toBeUpDatedProduct;
        } catch (Exception exception) {
            throw new IllegalStateException(exception.getMessage());
        }
    }
}
