package com.example.shop.product.service;

import com.example.shop.product.Model.ProductModel;
import com.example.shop.product.entity.Inventory;
import com.example.shop.product.entity.Product;
import com.example.shop.product.repository.InventoryRepo;
import com.example.shop.product.repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepo productRepo;
    private final InventoryRepo inventoryRepo;

    @Autowired
    public ProductService(ProductRepo productRepo, InventoryRepo inventoryRepo) {
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
    }

    public Optional<List<ProductModel>> getProducts() {
        return Optional.of(
                inventoryRepo
                        .findProductsWhereInventoryCountIsNotZero()
                        .stream()
                        .map(ProductModel::new)
                        .collect(Collectors.toList())
        );
    }

    public Optional<ProductModel> getProductById(Long id) {
        Product product = productRepo.findById(id).orElseThrow(
                () -> new RuntimeException("Product by id: " + id + " does not exist.")
        );
        return Optional.of(new ProductModel(product));
    }

    // change later lol
    public ProductModel getSingleProductById(Long id) {
        Product product = productRepo.findById(id).orElseThrow(
                () -> new RuntimeException("Product by id: " + id + " does not exist.")
        );
        return new ProductModel(product);
    }

    public List<ProductModel> getProductByName(String productName) {
//        List<Product> productList = productRepo.findByName(productName);
//        List<ProductModel> productModelList = new ArrayList<>();
//
//        for (Product product : productList) {
//            productModelList.add(new ProductModel(product));
//        }
        return productRepo
                .findByName(productName)
                .stream()
                .map(ProductModel::new)
                .collect(Collectors.toList());
    }

    public Optional<ProductModel> addProduct(ProductModel productModel) {
        Product product = new Product(productModel);

        Random random = new Random();

        String productCode = "prod_" + (random.nextInt(900) + 100);

        while (productRepo.existsProductByProductCode(productCode)) {
            productCode = "prod_" + (random.nextInt(900) + 100);
        }

        product.setProductCode(productCode);

        productRepo.save(product);

        inventoryRepo.save(new Inventory(product));

        return Optional.of(new ProductModel(product));
    }

    public Optional<List<ProductModel>> addMultipleProducts(List<ProductModel> productModelList) {

        List<ProductModel> returnList = new ArrayList<>();
        List<Inventory> inventoryList = new ArrayList<>();

        for (ProductModel productModel : productModelList) {
            Product product = new Product(productModel);

            Random random = new Random();

            String productCode = "prod_" + (random.nextInt(900) + 100);

            while (productRepo.existsProductByProductCode(productCode)) {
                productCode = "prod_" + (random.nextInt(900) + 100);
            }

            product.setProductCode(productCode);

            productRepo.save(product);

            inventoryList.add(new Inventory(product));

            returnList.add(new ProductModel(product));
        }
        inventoryRepo.saveAll(inventoryList);

        return Optional.of(returnList);
    }

    public ProductModel deleteProduct(Long id) {
        ProductModel productModel = new ProductModel(productRepo.findProductById(id));
        inventoryRepo.deleteById(inventoryRepo.findInventoriesByProduct_Id(id).getId());
        productRepo.deleteById(id);
        return productModel;
    }

    @Transactional
    public ProductModel updateProduct(ProductModel productModel) {

        try {
            Product toBeUpDatedProduct = productRepo.findById(productModel.getId()).orElseThrow(
                    () -> new RuntimeException("Product with ID: " + productModel.getId() + " does not exist")
            );

            if (productModel.getName() != null) {
                toBeUpDatedProduct.setName(productModel.getName());
            }
            if (productModel.getSpecifications() != null) {
                toBeUpDatedProduct.setSpecifications(productModel.getSpecifications());
            }
            if (productModel.getPrice() != null) {
                toBeUpDatedProduct.setPrice(productModel.getPrice());
            }

            if (productModel.getProductCode() != null) {
                toBeUpDatedProduct.setProductCode(productModel.getProductCode());
            }

            productRepo.save(toBeUpDatedProduct);

            return new ProductModel(toBeUpDatedProduct);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }

    public List<ProductModel> searchProducts(String query) {
        return productRepo
                .searchProducts(query)
                .stream()
                .map(ProductModel::new)
                .collect(Collectors.toList());
    }
}
