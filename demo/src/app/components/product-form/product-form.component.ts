import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators, ɵElement
} from "@angular/forms";
import {ShopApiService} from "../../services/shop-api.service";
import {Product_body} from "../../interface/product_body";
import {PRODUCT} from "../../interface/PRODUCT";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  addProductForm = this.formBuilder.group({
    name: ["", Validators.required],
    specification: ["", Validators.required],
    price: [0, Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private shopApiService: ShopApiService) {
  }

  onSubmit() {
    console.log(this.addProductForm.value, this.addProductForm.valid)
    const productBody: Product_body = {
      "name": this.addProductForm.value.name ?? "",
      "price": this.addProductForm.value.price ?? 0,
      "specifications": this.addProductForm.value.specification ?? ""
    };
    this.shopApiService.addProduct(productBody).subscribe(
      async (response: Product_body) => {
        // this.product_list.push(<PRODUCT>response)
        // console.log(this.product_list)
        console.log(response)
      }
    )
  }
}
