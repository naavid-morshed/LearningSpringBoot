import {Component} from '@angular/core';
import {ShopApiService} from "../../services/shop-api.service";
import {PRODUCT} from "../../interface/PRODUCT";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {ORDER_BODY} from "../../interface/order_body";
import {Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ORDER} from "../../interface/order";

@Component({
  selector: 'app-dropdown-list',
  standalone: true,
  imports: [NgbDropdownModule, NgForOf, NgIf, RouterLink, FaIconComponent, NgStyle],
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.css'
})
export class DropdownListComponent {
  productList: PRODUCT[] = [];
  orderTable: PRODUCT[] = [];
  cartList: number[] = [];
  numberOfItemsAddedToCart: number = 0;
  total: number = 0;
  public faTime: IconDefinition = faTimes;

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
  }

  addToOrder(item: PRODUCT): void {
    this.cartList.push(item.id);
    this.orderTable.push(item)
    this.numberOfItemsAddedToCart++;
    this.total += item.price;
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

    this.shopApiService.createOrder(order).subscribe(
      (orderResponse: ORDER): void => {
        // const id: number = orderResponse.id;
        this.router.navigate(["myorder"], {queryParams: {id: orderResponse.id}})
      }
    );

    this.clearCart()
  }

  clearCart(): void {
    this.cartList = [];
    this.orderTable = [];
    this.numberOfItemsAddedToCart = 0;
    this.total = 0;
  }

  deleteItemFromTable(item: PRODUCT): void {
    this.total -= item.price;
    this.orderTable.splice(this.orderTable.indexOf(item), 1);
  }

  navigateToListOfOrders() {
    this.router.navigate(["listOfOrders"])
  }
}
