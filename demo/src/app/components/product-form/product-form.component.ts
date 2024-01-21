import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule
} from "@angular/forms";
import {ShopApiService} from "../../services/shop-api.service";
import {PRODUCT_BODY} from "../../interface/product_body";
import {ActivatedRoute, Params} from "@angular/router";
import {PRODUCT} from "../../interface/product";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  updateProductForm = this.formBuilder.group({
    name: [""],
    specification: [""],
    price: [0],
    code: [""]
  })

  constructor(private formBuilder: FormBuilder, private shopApiService: ShopApiService, private route: ActivatedRoute) {
  }

  id: number = {} as number;
  product: PRODUCT = {} as PRODUCT;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);

      this.shopApiService.getProductById(this.id).subscribe(
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

    this.shopApiService.updateProduct(product);
  }
}
