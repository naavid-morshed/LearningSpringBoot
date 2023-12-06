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

    public List<ProductModel> getProducts() {
        List<ProductModel> productModelList = new ArrayList<>();
        for(Product product: repo.findAll()){
            productModelList.add(new ProductModel(product));
        }
        return productModelList;
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

    public ProductModel addProduct(ProductModel productModel) {
        Product product = new Product(productModel);
        repo.save(product);
        return new ProductModel(product);
    }

    public List<ProductModel> addProducts(List<ProductModel> productModelList) {

        List<ProductModel> returnList = new ArrayList<>();

        for (ProductModel productModel : productModelList) {
            Product product = new Product(productModel);
            repo.save(product);

            returnList.add(new ProductModel(product));
        }

        return returnList;
    }

    public void deleteProduct(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public ProductModel updateProduct(ProductModel productModel) {

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

            repo.save(toBeUpDatedProduct);
            return new ProductModel(toBeUpDatedProduct);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }
}
