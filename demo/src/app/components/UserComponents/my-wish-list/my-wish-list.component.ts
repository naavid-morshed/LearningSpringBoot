import {Component, OnInit} from '@angular/core';
import {PRODUCT} from "../../../dto/product";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {LocalStoreService} from "../../../services/local-store.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-my-wish-list',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './my-wish-list.component.html',
})
export class MyWishListComponent implements OnInit {
  constructor(
    private router: Router,
    private localStore: LocalStoreService
  ) {
  }

  ngOnInit(): void {

    if (!!this.localStore.getData(environment.wishListKey)) {
      this.myWishList = JSON.parse(this.localStore.getData(environment.wishListKey)) as PRODUCT[];
    }

  }

  myWishList: PRODUCT[] = []

  navigateToHomePage() {
    this.router.navigate([""]);
  }

  removeFromWishList(id: number) {

    this.myWishList.forEach(
      (product: PRODUCT, index: number) => {
        if (product.id === id) {
          this.myWishList.splice(index, 1)
          this.localStore.saveData(environment.wishListKey, JSON.stringify(this.myWishList));
          return;
        }
      }
    )

    if (this.myWishList.length === 0) {
      this.router.navigate([""])
    }
  }
}
