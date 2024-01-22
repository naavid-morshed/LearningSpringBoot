import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminLoginService} from "../../../services/admin-login.service";
import {AuthenticationRequest} from "../../../interface/authentication_request";

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

  constructor(private formBuilder: FormBuilder, private loginService: AdminLoginService) {
  }

  onSubmit(): void {
    const loginInfo: AuthenticationRequest = {
      email: this.loginInfo.value.name ?? "",
      password: this.loginInfo.value.password ?? "",
    };

    this.loginService
      .adminAuth(loginInfo.email, loginInfo.password);
  }
}
