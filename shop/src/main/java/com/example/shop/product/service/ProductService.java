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

@Service
public class ProductService {

    private final ProductRepo productRepo;
    private final InventoryRepo inventoryRepo;

    @Autowired
    public ProductService(ProductRepo productRepo, InventoryRepo inventoryRepo) {
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
    }

    public List<ProductModel> getProducts() {
        List<ProductModel> productModelList = new ArrayList<>();
        for (Product product : productRepo.findAll()) {
            productModelList.add(new ProductModel(product));
        }
        return productModelList;
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
        List<Product> productList = productRepo.findByName(productName);
        List<ProductModel> productModelList = new ArrayList<>();

        for (Product product : productList) {
            productModelList.add(new ProductModel(product));
        }
        return productModelList;
    }

    public ProductModel addProduct(ProductModel productModel) {

        Product product = new Product(productModel);

        Random random = new Random();

        String productCode = "prod_" + (random.nextInt(900) + 100);

        while (productRepo.existsProductByProductCode(productCode)) {
            productCode = "prod_" + (random.nextInt(900) + 100);
        }

        product.setProductCode(productCode);

        productRepo.save(product);

        inventoryRepo.save(new Inventory(product));

        return new ProductModel(product);
    }

//    public ProductModel addProduct(ProductModel productModel) {
//
//        if (productRepo.existsProductByName(productModel.getName())) {
//            Inventory inventory = inventoryRepo.findInventoryByProduct_Name(productModel.getName());
//            inventory.setProductCount(inventory.getProductCount() + 1);
//            inventoryRepo.save(inventory);
//
//            return new ProductModel(productRepo.findProductByName(productModel.getName()));
//        } else {
//            Product product = new Product(productModel);
//            productRepo.save(product);
//
//            inventoryRepo.save(new Inventory(product));
//
//            return new ProductModel(product);
//        }
//
//    }

    public List<ProductModel> addMultipleProducts(List<ProductModel> productModelList) {

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

        return returnList;
    }

//    public void deleteProduct(Long id) {
//        productRepo.deleteById(id);
//        System.err.println(inventoryRepo.findAll());
//    }

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

            productRepo.save(toBeUpDatedProduct);

            return new ProductModel(toBeUpDatedProduct);
        } catch (Exception exception) {
            throw new RuntimeException(exception.getMessage());
        }
    }
}
