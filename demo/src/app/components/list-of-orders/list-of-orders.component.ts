import {Component, OnInit} from '@angular/core';
import {ORDER} from "../../interface/order";
import {ShopApiService} from "../../services/shop-api.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-of-orders',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './list-of-orders.component.html',
  styleUrl: './list-of-orders.component.css'
})
export class ListOfOrdersComponent implements OnInit {
  orderList: ORDER[] = [];
  total: number[] = [];

  constructor(private shopApiService: ShopApiService) {
  }

  ngOnInit(): void {
    this.shopApiService.gerOrderList().subscribe((responseOrderListBody: ORDER[]): void => {
      this.orderList = responseOrderListBody;

      this.orderList.forEach((order: ORDER): void => {
        let totalPrice: number = 0;

        order.orderProductItemModelList.forEach(orderProductItemModel => {
          totalPrice += orderProductItemModel.price;
        })

        this.total.push(totalPrice);
      })
    });
  }
}
