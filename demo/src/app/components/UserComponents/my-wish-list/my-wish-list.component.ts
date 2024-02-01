import {Component, OnInit} from '@angular/core';
import {PRODUCT} from "../../../dto/product";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

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
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.myWishList = JSON.parse(localStorage.getItem("WishList") ?? "") as PRODUCT[];
  }

  myWishList: PRODUCT[] = []

  navigateToHomePage() {
    this.router.navigate([""]);
  }

  removeFromWishList(id: number) {

    this.myWishList.forEach(
      (product, index) => {
        if (product.id === id) {
          this.myWishList.splice(index, 1)
          localStorage.setItem("WishList",JSON.stringify(this.myWishList));
          return;
        }
      }
    )

    if (this.myWishList.length === 0) {
      this.router.navigate([""])
    }
  }
}
