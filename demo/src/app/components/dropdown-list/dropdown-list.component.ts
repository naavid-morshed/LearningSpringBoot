import {Component} from '@angular/core';
import {ShopApiService} from "../../services/shop-api.service";
import {PRODUCT} from "../../interface/PRODUCT";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf} from "@angular/common";
import {ORDER_BODY} from "../../interface/order_body";
import {OrderTableComponent} from "./order-table/order-table.component";

@Component({
  selector: 'app-dropdown-list',
  standalone: true,
  imports: [NgbDropdownModule, NgForOf, NgIf, OrderTableComponent],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.css'
})
export class DropdownListComponent {
  constructor(private shopApiService: ShopApiService) {
  }

  productList: PRODUCT[] = [];
  cartList: number[] = [];

  numberOfItemsAddedToCart: number = 0;

  orderProductItemModelList: Array<{
    price: number
    productModel: {
      id: number
    }
  }> = [];

  ngOnInit(): void {
    this.shopApiService.getProductJSON().subscribe(
      (product_list: PRODUCT[]): void => {
        this.productList = product_list;
      }
    );
  }

  addToOrder(id: number): void {
    this.cartList.push(id);
    this.numberOfItemsAddedToCart++;
    console.log(this.cartList)
  }

  removeFromOrder(id: number): void {
    if (this.numberOfItemsAddedToCart > 0) {
      this.cartList.splice(this.cartList.indexOf(id), 1)
      this.numberOfItemsAddedToCart--;
      console.log(this.cartList)
    }
  }

  createOrder(): void {
    this.orderProductItemModelList = [];

    this.cartList.forEach((id: number): void => {
      this.orderProductItemModelList.push({
        price: this.productList.find((product: PRODUCT): boolean => product.id === id)?.price ?? 0,
        productModel: {
          id: id
        }
      });
    });

    const order: ORDER_BODY = {
      deliveryAddress: "Kollyanpur",
      orderProductItemModelList: this.orderProductItemModelList
    }

    console.log(order)
    this.shopApiService.createOrder(order).subscribe();
    this.clearCart()
  }

  clearCart(): void {
    this.cartList = [];
    this.numberOfItemsAddedToCart = 0;
  }
}
