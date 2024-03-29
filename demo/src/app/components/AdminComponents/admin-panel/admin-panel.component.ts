import {Component} from '@angular/core';
import {PRODUCT} from "../../../dto/product";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {NgForOf, NgStyle} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {ApiUrls} from "../../../environments/api-urls";
import {ToastrService} from "ngx-toastr";
import {RouterUrls} from "../../../environments/route-urls";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    NgStyle,
    FormsModule
  ],
  templateUrl: './admin-panel.component.html',
})
export class AdminPanel {

  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.httpService.get(ApiUrls.productUrl)
      .pipe(
        map(r => {
          return r as PRODUCT[]
        })
      )
      .subscribe(
        (product_list: PRODUCT[]): void => {
          this.product_list = product_list;
          this.temporaryProductListHolder = product_list;
        }
      );

    this.minPrice = this.product_list.length > 0 ? this.product_list.reduce((min, product) => product.price < min ? product.price : min, this.product_list[0].price) : 0;
    this.maxPrice = this.product_list.length > 0 ? this.product_list.reduce((max, product) => product.price > max ? product.price : max, this.product_list[0].price) : 0;
    this.fromVal = this.minPrice;
    this.toVal = this.maxPrice;
  }

  public product_list: PRODUCT[] = [];

  public faTime: IconDefinition = faTimes;
  public faEdit: IconDefinition = faEdit;

  public minPrice: number = 0;
  public maxPrice: number = 0;

  public deleteItem(item: PRODUCT): void {
    this.httpService.delete(`${ApiUrls.productUrl}/id/${item.id}`)
      .subscribe({
          next: () => this.product_list = this.product_list.filter(
            (t: PRODUCT): boolean => t.id !== item.id
          ),
          complete: () => this.toastr.warning("Deletion Complete")
        }
      );
  }

  public disableButton: boolean = false;
  fromVal: number = 0;
  toVal: number = 0;

  public highToLow(): void {
    this.product_list.sort((a, b) => b.price - a.price);
    this.disableButton = !this.disableButton;
  }

  public lowToHigh(): void {
    this.product_list.sort((a, b) => a.price - b.price);
    this.disableButton = !this.disableButton;
  }

  public updateProduct(item: PRODUCT): void {
    this.router.navigate(
      [RouterUrls.updateProduct.url],
      {
        queryParams: {id: item.id},
        // queryParamsHandling: "preserve"
      }
    );
  }

  temporaryProductListHolder: PRODUCT[] = [];

  sortFromAndTo(): void {
    if (this.fromVal > this.toVal || this.fromVal < 0 || this.toVal < 0) {
      alert("Please set an appropriate range");
    } else {
      this.product_list = this.temporaryProductListHolder;
      this.product_list = this.product_list.filter((product: PRODUCT) => product.price <= this.toVal && product.price >= this.fromVal);
    }
  }

  navigateToAddProductFormPage() {
    this.router.navigate(['addProduct'])
  }
}
