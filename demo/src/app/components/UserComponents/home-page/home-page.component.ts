import {Component} from '@angular/core';
import {PRODUCT} from "../../../dto/product";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

import {faHeart as faHeartSolid} from "@fortawesome/free-solid-svg-icons";
import {faHeart as faHeartRegular} from "@fortawesome/free-regular-svg-icons";
import {FormsModule} from "@angular/forms";
import {LocalStoreService} from "../../../services/local-store.service";
import {environment} from "../../../environments/environment";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, NgForOf, NgIf, RouterLink, FaIconComponent, NgStyle, NgOptimizedImage, FormsModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productList: PRODUCT[] = [];
  numberOfItemsAddedToCart: number = 0;

  stringifyAbleObjectOfTypeProduct: PRODUCT[] = [] as PRODUCT[];
  wishBoolean: boolean[] = [];
  wishList: PRODUCT[] = []

  constructor(
    private localStore: LocalStoreService,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.httpService.get(environment.productUrl)
      .pipe(
        map(r => {
          return r as PRODUCT[];
        })
      )
      .subscribe(
      (product_list: PRODUCT[]): void => {

        this.productList = product_list;
        this.wishBoolean = new Array(this.productList.length).fill(false)

        if (!!this.localStore.getData(environment.wishListKey)) {
          this.wishList = JSON.parse(this.localStore.getData(environment.wishListKey)) as PRODUCT[];

          this.wishList.forEach((wishItem: PRODUCT): void => {
            let index: number = 0;

            this.productList.filter((product: PRODUCT): void => {
              if (product.id == wishItem.id) {
                index = this.productList.indexOf(product);
              }
            })

            this.wishBoolean[index] = true;
          });
        }

      }
    );

    const jsonData: string = this.localStore.getData(environment.cartKey);

    if (jsonData !== "") {
      this.stringifyAbleObjectOfTypeProduct = JSON.parse(jsonData) as PRODUCT[];
      this.numberOfItemsAddedToCart += this.stringifyAbleObjectOfTypeProduct.length;
    }
  }

  addToOrder(item: PRODUCT): void {
    this.numberOfItemsAddedToCart++;
    this.stringifyAbleObjectOfTypeProduct.push(item)

    this.localStore.saveData(environment.cartKey, JSON.stringify(this.stringifyAbleObjectOfTypeProduct));
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
    this.localStore.removeData(environment.cartKey);
  }

  navigateToPlaceOrderTable(): void {
    this.router.navigate(['placeOrder'],);
  }

  protected readonly faHeartSolid = faHeartSolid;
  protected readonly faHeartRegular = faHeartRegular;
  public search: string = "";

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

    this.localStore.saveData(environment.wishListKey, JSON.stringify(this.wishList));
  }

  navigateToWishList() {
    this.router.navigate(["MyWishList"]);
  }

  navigateToMyOrders() {
    this.router.navigate(["listOfOrders"]);
  }

  navigateToMyAccount() {
    this.router.navigate(["myaccount"]);
  }

  reloadPage() {
    window.location.reload()
  }

  showSearchOutput() {
    this.httpService.get(`${environment.productUrl}/search?query=${this.search}`)
      .pipe(
        map(r => {
          return r as PRODUCT[]
        })
      )
      .subscribe(
      (response: PRODUCT[]) => this.productList = response
    )
  }
}
