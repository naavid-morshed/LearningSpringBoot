package com.example.shop.product.Model;

import com.example.shop.product.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryModel {
    private Long id;
    private ProductModel productModel;
    private Integer productCount;

    public InventoryModel(ProductModel productModel) {
        this.productModel = productModel;
    }

    public InventoryModel(Inventory inventory) {
        this.setId(inventory.getId());
        this.setProductModel(new ProductModel(inventory.getProduct()));
        this.setProductCount(inventory.getProductCount());
    }
}
