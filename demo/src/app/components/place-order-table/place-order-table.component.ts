import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PRODUCT} from "../../interface/PRODUCT";
import {ShopApiService} from "../../services/shop-api.service";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {CART} from "../../interface/cart";

@Component({
  selector: 'app-place-order-table',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './place-order-table.component.html',
  styleUrl: './place-order-table.component.css'
})
export class PlaceOrderTableComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private shopApiService: ShopApiService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params: Params): void => {
        this.listOfId = params['listOfId'];
        this.shopApiService.getProductByListOfId(this.listOfId).subscribe((responseProductBody: PRODUCT[]): void => {
            this.productList = responseProductBody;

            this.productList.forEach((product: PRODUCT): void => {
              // index will be negative one, if findIndex returns false
              const index: number = this.cartOfProduct.findIndex((item: any): boolean => item.id === product.id);

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
            console.log(this.cartOfProduct)
          }
        )
      }
    )
  }

  listOfId: number[] = [];

  cartOfProduct: CART[] = [];

  productList: PRODUCT [] = [];


}
