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
import {ApiUrls} from "../../../environments/api-urls";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {KeyStore} from "../../../environments/keystorage";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgbDropdownModule, NgForOf, NgIf, RouterLink, FaIconComponent, NgStyle, NgOptimizedImage, FormsModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productList: PRODUCT[] = [];
  numberOfItemsAddedToCart: number = 0;

  cart: PRODUCT[] = [] as PRODUCT[];
  wishBoolean: boolean[] = [];
  wishList: PRODUCT[] = []

  constructor(
    private localStore: LocalStoreService,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  ngOnInit(): void {
    this.httpService
      .get(ApiUrls.productUrl)
      .pipe(
        map(r => {
          return r as PRODUCT[];
        })
      )
      .subscribe(
        (product_list: PRODUCT[]): void => {
          this.productList = product_list;
          this.wishBoolean = new Array(this.productList.length).fill(false);

          if (this.localStore.hasData(KeyStore.wishListKey)) {
            this.wishList = this.localStore.getData(KeyStore.wishListKey) as PRODUCT[];

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


    if (this.localStore.hasData(KeyStore.cartKey)) {
      this.cart = this.localStore.getData(KeyStore.cartKey) as PRODUCT[];
      this.numberOfItemsAddedToCart += this.cart.length;
    }
  }

  addToOrder(item: PRODUCT): void {
    this.numberOfItemsAddedToCart++;
    this.cart.push(item)

    this.localStore.saveData(KeyStore.cartKey, this.cart);
  }

  clearCart(): void {
    this.numberOfItemsAddedToCart = 0;

    this.cart = [] as PRODUCT[];
    this.localStore.removeData(KeyStore.cartKey);
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

    this.localStore.saveData(KeyStore.wishListKey, this.wishList);
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
    this.httpService.get(`${ApiUrls.productUrl}/search?query=${this.search}`)
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
