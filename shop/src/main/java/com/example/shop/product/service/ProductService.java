package com.example.shop.product.service;

import com.example.shop.product.Model.ProductModel;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public Optional<ProductModel> getProductById(Long id) {
        Product product = repo.findById(id).orElseThrow(
                () -> new RuntimeException("Product by id: " + id + " does not exist.")
        );
        return Optional.of(new ProductModel(product));
    }

    public List<ProductModel> getProductByName(String productName) {
        List<Product> productList = repo.findByName(productName);
        List <ProductModel> productModelList = new ArrayList<>();

        for (Product product: productList) {
            productModelList.add(new ProductModel(product));
        }
        return  productModelList;
    }

    public Product addProduct(ProductModel productModel) {
        return repo.save(new Product(productModel));
    }

    public List<Product> addProducts(List<ProductModel> productModelList) {

        List<Product> productList = new ArrayList<>();
        for (ProductModel productModel : productModelList) {
            productList.add(new Product(productModel));
        }

        return repo.saveAll(productList);
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public Product updateProduct(ProductModel productModel) {

        try {
            Product toBeUpDatedProduct = repo.findProductById(productModel.getId());
            if (toBeUpDatedProduct == null) {
                throw new RuntimeException("Product with ID: " + productModel.getId() + " does not exist");
            }
            if (productModel.getName() != null) {
                toBeUpDatedProduct.setName(productModel.getName());
            }
            if (productModel.getSpecifications() != null) {
                toBeUpDatedProduct.setSpecifications(productModel.getSpecifications());
            }
            if (productModel.getPrice() != null) {
                toBeUpDatedProduct.setPrice(productModel.getPrice());
            }

            return repo.save(toBeUpDatedProduct);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }
}
