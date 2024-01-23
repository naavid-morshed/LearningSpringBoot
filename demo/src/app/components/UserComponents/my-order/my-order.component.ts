import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ShopApiService} from "../../../services/shop-api.service";
import {ORDER} from "../../../interface/order";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './my-order.component.html',
})
export class MyOrderComponent implements OnInit {
  order: ORDER = {} as ORDER;
  subTotal: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private shopApiService: ShopApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params): void => {
      // here params['id'] is being captured then passed into api service
      this.shopApiService.getOrderById(params['id']).subscribe((orderResponseBody: ORDER): void => {
        this.order = orderResponseBody;

        this.order.orderProductItemModelList.forEach((orderProductItemModelItem): void => {
          this.subTotal += orderProductItemModelItem.price;
        })
      })
    })
  }

  returnHome(): void {
    this.router.navigate([""]);
  }

  helpButton(): void {
    alert("Help is on the way");
  }
}
