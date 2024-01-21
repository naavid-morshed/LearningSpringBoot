import {Component, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ShopApiService} from "../../services/shop-api.service";
import {PRODUCT_BODY} from "../../interface/product_body";
import {LoginService} from "../../services/login.service";
import {AuthenticationRequest} from "../../interface/authentication_request";

@Component({
  selector: 'app-admin-log-in-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-log-in.component.html',
})
export class AdminLogIn {
  loginInfo = this.formBuilder.group({
    name: ["", Validators.required],
    password: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
  }

  onSubmit(): void {
    const loginInfo: AuthenticationRequest = {
      email: this.loginInfo.value.name ?? "",
      password: this.loginInfo.value.password ?? "",
    };

    this.loginService
      .getJwtToken(loginInfo.email, loginInfo.password);
  }
}
