import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ORDER} from "../../../dto/order";
import {NgForOf} from "@angular/common";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {ApiUrls} from "../../../environments/api-urls";

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams: Params): void => {
      // here params['id'] is being captured then passed into api service

      this.httpService.get(`${ApiUrls.orderUrl}/order/id/${queryParams['id']}`)
        .pipe(
          map(r => {
            return r as ORDER;
          })
        )
        .subscribe((orderResponseBody: ORDER): void => {
          this.order = orderResponseBody;

          this.order.orderProductItemModelList.forEach((orderProductItemModelItem): void => {
            this.subTotal += orderProductItemModelItem.price;
          });
        })
    })
  }

  returnHome(): void {
    this.router.navigate([""]);
  }

  helpButton(): void {
    alert("Help is on the way");
  }

  navigateToMyOrders() {
    this.router.navigate(["listOfOrders"]);
  }
}
