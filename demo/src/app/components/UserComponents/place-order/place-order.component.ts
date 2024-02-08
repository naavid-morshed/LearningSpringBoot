import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PRODUCT} from "../../../dto/product";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {CART} from "../../../dto/cart";
import {ORDER_BODY, OrderProductItemModel} from "../../../dto/order_body";
import {ORDER} from "../../../dto/order";
import {map} from "rxjs/operators";
import {USER} from "../../../dto/user";
import {ToastrService} from "ngx-toastr";
import {LocalStoreService} from "../../../services/local-store.service";
import {ApiUrls} from "../../../environments/api-urls";
import {HttpService} from "../../../services/http.service";
import {KeyStore} from "../../../environments/keystorage";
import {RouterUrls} from "../../../environments/route-urls";

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
  ],
  templateUrl: './place-order.component.html',
})
export class PlaceOrderComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private localStore: LocalStoreService,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.localStore.hasData(KeyStore.cartKey);
    if (this.localStore.hasData(KeyStore.cartKey)) {
      this.productList = this.localStore.getData(KeyStore.cartKey) as PRODUCT[];

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

    this.localStore.saveData(KeyStore.cartKey, this.productList);
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

    this.localStore.saveData(KeyStore.cartKey, this.productList);
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

    this.localStore.saveData(KeyStore.cartKey, this.productList)

    if (this.cartOfProduct.length === 0) {
      this.navigateToHomePage();
    }
  }

  navigateToHomePage(): void {
    this.router.navigate([RouterUrls.homePage.url])
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

    this.httpService.get(`${ApiUrls.serverUrl}/api/v1/user`)
      .pipe(
        map((r: any) => {
          const response: USER = r as USER;
          return response.address as string;
        })
      ).subscribe(
      (address: string): void => {

        const orderBody: ORDER_BODY = {
          deliveryAddress: address,
          orderProductItemModelList: list
        }

        this.httpService.post(`${ApiUrls.orderUrl}/order`, orderBody).pipe(
          map((response: any) => {
            const r: ORDER = response as ORDER;
            return r.id
          }),
        ).subscribe({
          next: (orderId: number): void => {
            this.router.navigate(
              [RouterUrls.myOrder.url],
              {queryParams: {id: orderId}}
            )
          },
          error: err => this.toastr.error(err.error.message, "Insufficient Stock"),
          complete: () => this.localStore.removeData(KeyStore.cartKey),
        })

      }
    );
  }
}
