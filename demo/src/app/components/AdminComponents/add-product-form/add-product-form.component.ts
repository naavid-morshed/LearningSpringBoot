import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {PBWC} from "../../../dto/product_body_without_code";
import {HttpService} from "../../../services/http.service";
import {environment} from "../../../environments/environment";

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  onSubmit() {

    const product: PBWC = {
      name: this.addProductForm.value.name ?? "",
      specifications: this.addProductForm.value.specification ?? "",
      price: this.addProductForm.value.price ?? 0,
    };

    this.httpService.post(`${environment.productUrl}/addProduct`, product)
      .subscribe({
        complete: () => this.router.navigate(['adminPanel'])
      });

  }
}
