import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PBWC} from "../../../dto/product_body_without_code";
import {HttpService} from "../../../services/http.service";
import {ApiUrls} from "../../../environments/api-urls";
import {RouterUrls} from "../../../environments/route-urls";

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
    name: ["", Validators.required],
    specifications: [""],
    price: [0],
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
  ) {
  }

  onSubmit(): void {
    this.httpService.post(
      `${ApiUrls.productUrl}/addProduct`,
      this.addProductForm.value as PBWC
    ).subscribe({
      complete: () => this.router.navigateByUrl(RouterUrls.adminPanel.url)
    });

  }
}
