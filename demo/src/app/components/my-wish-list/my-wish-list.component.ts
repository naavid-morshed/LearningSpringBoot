import {Component, OnInit} from '@angular/core';
import {PRODUCT} from "../../interface/product";
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
  styleUrl: './my-wish-list.component.css'
})
export class MyWishListComponent implements OnInit {
  constructor(private router:Router) {
  }
  ngOnInit(): void {
    this.myWishList = JSON.parse(localStorage.getItem("WishList") ?? "") as PRODUCT[];
  }

  myWishList: PRODUCT[] = []

  navigateToHomePage() {
    this.router.navigate([""]);
  }
}
