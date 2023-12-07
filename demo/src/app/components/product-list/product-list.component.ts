import {Component} from '@angular/core';
import {PRODUCT} from "../../interface/PRODUCT";
import {ShopApiService} from "../../services/shop-api.service";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {faEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Product_body} from "../../interface/product_body";
import {NgForOf, NgStyle} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {log} from "util";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    NgStyle,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  constructor(private shopApiService: ShopApiService) {
  }

  ngOnInit(): void {
    this.shopApiService.getProductJSON().subscribe(
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
    this.shopApiService.deleteToDo(item).subscribe(
      () => (this.product_list = this.product_list.filter(
        (t: PRODUCT): boolean => t.id !== item.id
      ))
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

  public addToDo($product: Product_body): void {
    console.log($product)
    this.shopApiService.addProduct($product).subscribe(
      async (response: Product_body) => {
        this.product_list.push(<PRODUCT>response)
        console.log(this.product_list)
      }
    )

    // these two lines will reSort the min and max range
    // seems like a performance hog for a large amount of data, check new val price and sort
    // accordingly?
    this.temporaryProductListHolder = this.product_list;
    this.sortFromAndTo();
  }

  public updateProduct(item: PRODUCT): void {
    console.log(item)
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
}
