import {Component, OnInit} from '@angular/core';
import {ORDER} from "../../../dto/order";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {map} from 'rxjs';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-list-of-orders',
  standalone: true,
  imports: [
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './my-list-of-orders.component.html',
})
export class MyListOfOrdersComponent implements OnInit {
  orderList: ORDER[] = [];
  total: number[] = [];
  deliveryAndPlatformFee: number = 53;

  constructor(
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.httpService.get(`${environment.orderUrl}/ordersByUser`)
      .pipe(
        map(r => {
          return r as ORDER[];
        })
      )
      .subscribe((responseOrderListBody: ORDER[]): void => {
        this.orderList = responseOrderListBody;

        this.orderList.forEach((order: ORDER): void => {
          let totalPrice: number = 0;

          order.orderProductItemModelList.forEach(orderProductItemModel => {
            totalPrice += orderProductItemModel.price;
          })

          this.total.push(totalPrice + this.deliveryAndPlatformFee);
        })
      });
  }

  navigateToMyOrder(id: number): void {
    this.router.navigate(["myorder"], {queryParams: {id: id}});
  }

  returnHome() {
    this.router.navigate(['']);
  }
}
