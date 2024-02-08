import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PRODUCT} from "../../../dto/product";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {ApiUrls} from "../../../environments/api-urls";
import {RouterUrls} from "../../../environments/route-urls";

@Component({
  selector: 'app-update-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-product-form.component.html',
})
export class UpdateProductFormComponent implements OnInit {
  updateProductForm = this.formBuilder.group({
    id: [0, Validators.required],
    name: [""],
    specifications: [""],
    price: [0],
    code: [""]
  })

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  product: PRODUCT = {} as PRODUCT;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams: Params): void => {

      this.httpService.get(`${ApiUrls.productUrl}/productId/${queryParams["id"]}`)
        .pipe(
          map(r => {
            return r as PRODUCT
          })
        )
        .subscribe(
          (response: PRODUCT): void => {
            this.product = response;

            this.updateProductForm.patchValue({
              id: this.product.id,
              name: this.product.name,
              specifications: this.product.specifications,
              price: this.product.price,
              code: this.product.productCode
            });
          }
        )
    });
  }

  onSubmit() {
    if (this.httpService.put(`${ApiUrls.productUrl}/update`, this.updateProductForm.value as PRODUCT)
      .pipe(
        map(r => {
          return r as PRODUCT;
        })
      )
      .subscribe((responseBody: PRODUCT): boolean => {
          return responseBody.id !== null;
        }
      )) {

      this.router.navigate([RouterUrls.adminPanel.url]);
    } else {
      console.log("error occurred, handle this later");
    }
  }
}
