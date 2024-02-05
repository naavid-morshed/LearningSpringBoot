import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule
} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PRODUCT} from "../../../dto/product";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

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
    name: [""],
    specification: [""],
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

  id: number = {} as number;
  product: PRODUCT = {} as PRODUCT;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = Number(params['id']);

      this.httpService.get(`${environment.productUrl}/productId/${this.id}`)
        .pipe(
          map(r => {
            return r as PRODUCT
          })
        )
        .subscribe(
          (response: PRODUCT) => {
            this.product = response;

            this.updateProductForm.patchValue({
              name: this.product.name,
              specification: this.product.specifications,
              price: this.product.price,
              code: this.product.productCode
            });
          }
        )
    });
  }

  onSubmit() {

    const product: PRODUCT = {
      id: this.product.id,
      name: this.updateProductForm.value.name ?? "",
      price: this.updateProductForm.value.price ?? 0,
      specifications: this.updateProductForm.value.specification ?? "",
      productCode: this.updateProductForm.value.code ?? ""
    };

    if (this.httpService.put(`${environment.productUrl}/update`, product)
      .pipe(
        map(r => {
          return r as PRODUCT;
        })
      )
      .subscribe((responseBody: PRODUCT): boolean => {
          return responseBody.id !== null;
        }
      )) {

      this.router.navigate(['adminPanel']);
    } else {
      console.log("error occurred, handle this later");
    }
  }
}
