import {Component} from '@angular/core';
import {ShopApiService} from "../../services/shop-api.service";
import {PRODUCT} from "../../interface/PRODUCT";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ORDER_BODY} from "../../interface/order_body";
import {Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ORDER} from "../../interface/order";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, NgForOf, NgIf, RouterLink, FaIconComponent, NgStyle, NgOptimizedImage],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  productList: PRODUCT[] = [];
  // orderTable: PRODUCT[] = [];
  numberOfItemsAddedToCart: number = 0;
  // public faTime: IconDefinition = faTimes;
  stringifyAbleObjectOfTypeProduct: PRODUCT[] = [] as PRODUCT[];

  orderProductItemModelList: Array<{
    price: number
    productModel: {
      id: number
    }
  }> = [];

  constructor(private shopApiService: ShopApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.shopApiService.getProductJSON().subscribe(
      (product_list: PRODUCT[]): void => {
        this.productList = product_list;
      }
    );

    const jsonData: string = localStorage.getItem("Cart") ?? "";

    if (jsonData !== "") {
      this.stringifyAbleObjectOfTypeProduct = JSON.parse(jsonData) as PRODUCT[];
      this.numberOfItemsAddedToCart += this.stringifyAbleObjectOfTypeProduct.length;
    }
  }

  addToOrder(item: PRODUCT): void {
    // this.orderTable.push(item);
    this.numberOfItemsAddedToCart++;
    this.stringifyAbleObjectOfTypeProduct.push(item)
  }

  createOrder(): void {
    this.orderProductItemModelList = [];

    // this.cartList.forEach((id: number): void => {
    //   this.orderProductItemModelList.push({
    //     price: this.productList.find((product: PRODUCT): boolean => product.id === id)?.price ?? 0,
    //     productModel: {
    //       id: id
    //     }
    //   });
    // });

    const order: ORDER_BODY = {
      deliveryAddress: "Kollyanpur",
      orderProductItemModelList: this.orderProductItemModelList
    }

    this.shopApiService.createOrder(order).subscribe(
      (orderResponse: ORDER): void => {
        // const id: number = orderResponse.id;
        this.router.navigate(["myorder"], {queryParams: {id: orderResponse.id}})
      }
    );

    this.clearCart()
  }

  clearCart(): void {
    // this.orderTable = [];
    this.numberOfItemsAddedToCart = 0;

    this.stringifyAbleObjectOfTypeProduct = [] as PRODUCT[];
    localStorage.removeItem("Cart");
  }

  deleteItemFromTable(item: PRODUCT): void {
    // this.orderTable.splice(this.orderTable.indexOf(item), 1);
  }

  navigateToListOfOrders() {
    this.router.navigate(["listOfOrders"])
  }

  navigateToPlaceOrderTable() {
    const jsonData: string = JSON.stringify(this.stringifyAbleObjectOfTypeProduct);
    localStorage.setItem("Cart", jsonData);

    this.router.navigate(['placeOrderTable'],);
  }
}
