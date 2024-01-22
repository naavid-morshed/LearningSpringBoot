import {Component} from '@angular/core';
import {ShopApiService} from "../../../services/shop-api.service";
import {PRODUCT} from "../../../interface/product";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, NgForOf, NgIf, RouterLink, FaIconComponent, NgStyle, NgOptimizedImage],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productList: PRODUCT[] = [];
  numberOfItemsAddedToCart: number = 0;

  stringifyAbleObjectOfTypeProduct: PRODUCT[] = [] as PRODUCT[];
  wishBoolean: boolean[] = [];
  wishList: PRODUCT[] = []

  constructor(private shopApiService: ShopApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.shopApiService.getProductJSON().subscribe(
      (product_list: PRODUCT[]): void => {
        this.productList = product_list;
        this.wishBoolean = new Array(this.productList.length).fill(false)

        this.wishList = JSON.parse(localStorage.getItem("WishList") ?? "") as PRODUCT[];

        this.wishList.forEach((wishItem: PRODUCT): void => {
          let index: number = 0;

          this.productList.filter((product: PRODUCT): void => {
            if (product.id == wishItem.id) {
              index = this.productList.indexOf(product);
            }
          })

          this.wishBoolean[index] = true;
        });

        console.log(this.wishBoolean);
      }
    );

    const jsonData: string = localStorage.getItem("Cart") ?? "";

    if (jsonData !== "") {
      this.stringifyAbleObjectOfTypeProduct = JSON.parse(jsonData) as PRODUCT[];
      this.numberOfItemsAddedToCart += this.stringifyAbleObjectOfTypeProduct.length;
    }
  }

  addToOrder(item: PRODUCT): void {
    this.numberOfItemsAddedToCart++;
    this.stringifyAbleObjectOfTypeProduct.push(item)
  }

  // createOrder(): void {
  //   this.orderProductItemModelList = [];
  //
  //   const order: ORDER_BODY = {
  //     deliveryAddress: "Kollyanpur",
  //     orderProductItemModelList: this.orderProductItemModelList
  //   }
  //
  //   this.shopApiService.createOrder(order).subscribe(
  //     (orderResponse: ORDER): void => {
  //       // const id: number = orderResponse.id;
  //       this.router.navigate(["myorder"], {queryParams: {id: orderResponse.id}})
  //     }
  //   );
  //
  //   this.clearCart()
  // }

  clearCart(): void {
    this.numberOfItemsAddedToCart = 0;

    this.stringifyAbleObjectOfTypeProduct = [] as PRODUCT[];
    localStorage.removeItem("Cart");
  }

  navigateToPlaceOrderTable(): void {
    const jsonData: string = JSON.stringify(this.stringifyAbleObjectOfTypeProduct);
    localStorage.setItem("Cart", jsonData);

    this.router.navigate(['placeOrderTable'],);
  }

  protected readonly faHeartSolid = faHeartSolid;
  protected readonly faHeartRegular = faHeartRegular;

  toggleWish(indexOfItemOfProductList: number): void {
    this.wishBoolean[indexOfItemOfProductList] = !this.wishBoolean[indexOfItemOfProductList];

    if (this.wishBoolean[indexOfItemOfProductList]) {
      this.wishList.push(this.productList[indexOfItemOfProductList]);
    } else {

      const index: number = this.wishList.findIndex((wishItem: PRODUCT): boolean => {
        return wishItem.id === this.productList[indexOfItemOfProductList].id
      });

      this.wishList.splice(index, 1);
    }

    localStorage.setItem("WishList", JSON.stringify(this.wishList));
  }

  navigateToWishList() {
    this.router.navigate(["MyWishList"])
  }
}
