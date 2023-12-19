import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PRODUCT} from "../../interface/PRODUCT";
import {ShopApiService} from "../../services/shop-api.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {CART} from "../../interface/cart";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private shopApiService: ShopApiService, private router: Router) {
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

  // listOfId: number[] = [];
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
}
