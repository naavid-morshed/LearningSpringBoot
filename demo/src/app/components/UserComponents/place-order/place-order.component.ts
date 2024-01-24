import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PRODUCT} from "../../../interface/product";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {CART} from "../../../interface/cart";
import {ORDER_BODY, OrderProductItemModel} from "../../../interface/order_body";
import {ShopApiService} from "../../../services/shop-api.service";
import {ORDER} from "../../../interface/order";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './place-order.component.html',
})
export class PlaceOrderComponent implements OnInit {
  constructor(private router: Router, private shopApiService: ShopApiService) {
  }

  ngOnInit(): void {
    const jsonData: string = localStorage.getItem("Cart") ?? "";

    if (jsonData !== "") {
      this.productList = JSON.parse(jsonData) as PRODUCT[];

      this.productList.forEach((product: PRODUCT): void => {
        // index will be negative one, if findIndex returns false
        const index: number = this.cartOfProduct.findIndex((item: CART): boolean => item.id === product.id);

        if (index === -1) {
          // If the id does not exist in the cart, add it with a count of 1
          this.cartOfProduct.push({
            count: 1,
            id: product.id,
            name: product.name,
            specification: product.specifications,
            price: product.price
          });
        } else {
          this.cartOfProduct[index].count++;
        }

      });
    }
  }

  cartOfProduct: CART[] = [];
  productList: PRODUCT [] = [];

  decreaseCount(item: CART): void {
    item.count--;
    for (let index: number = 0; index < this.productList.length; index++) {
      if (this.productList[index].id == item.id) {
        const product: PRODUCT = this.productList[index];
        this.productList.splice(this.productList.indexOf(product), 1);
        break;
      }
    }

    localStorage.setItem("Cart", JSON.stringify(this.productList));
  }

  increaseCount(item: CART): void {
    item.count++;

    for (let index: number = 0; index < this.productList.length; index++) {
      if (this.productList[index].id == item.id) {
        const product: PRODUCT = this.productList[index];
        this.productList.push(product);
        break;
      }
    }

    localStorage.setItem("Cart", JSON.stringify(this.productList));
  }

  removeFromCart(item: CART, indexOfItemInCart: number): void {

    for (let index: number = 0; index < this.productList.length; index++) {
      const value: PRODUCT = this.productList[index];
      if (value.id == item.id) {
        this.productList.splice(index, 1);
        index--;
      }
    }

    this.cartOfProduct.splice(indexOfItemInCart, 1);

    localStorage.setItem("Cart", JSON.stringify(this.productList))

    if (this.cartOfProduct.length === 0) {
      this.router.navigate(['']);
    }
  }

  navigateToHomePage(): void {
    this.router.navigate([""])
  }

  placeOrder() {
    const list: OrderProductItemModel[] = [];

    this.productList.forEach(
      (prod: PRODUCT) => list.push({
        price: prod.price,
        productModel: {
          id: prod.id
        },
      })
    )

    const orderBody: ORDER_BODY = {
      deliveryAddress: "Mohammadpur",
      orderProductItemModelList: list
    }

    this.shopApiService.createOrder(orderBody).subscribe(
      (order: ORDER) => this.router.navigate(
        ["myorder"],
        {
          queryParams: {id: order.id}
        })
    )
  }
}
