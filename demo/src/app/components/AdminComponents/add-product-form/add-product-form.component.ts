import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ShopApiService} from "../../../services/shop-api.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PRODUCT} from "../../../interface/product";
import {PRODUCT_BODY} from "../../../interface/product_body";
import {PBWC} from "../../../interface/product_body_without_code";

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-product-form.component.html',
})
export class AddProductFormComponent {
  addProductForm = this.formBuilder.group({
    name: [""],
    specification: [""],
    price: [0],
  })

  constructor(private formBuilder: FormBuilder, private shopApiService: ShopApiService, private router: Router) {
  }

  onSubmit() {

    const product: PBWC = {
      name: this.addProductForm.value.name ?? "",
      specifications: this.addProductForm.value.specification ?? "",
      price: this.addProductForm.value.price ?? 0,
    };

    // const productForm = new FormData;
    // productForm.append('formData', this.addProductForm);
    //
    // console.log(productForm);
    //
    // let url = '/addProduct';

    this.shopApiService.addProduct(product).subscribe();
    this.router.navigate(['adminPanel']);

  }
}
