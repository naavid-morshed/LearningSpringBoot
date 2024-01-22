import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserLoginService} from "../../../../services/user-login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginInfo = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private userLoginService: UserLoginService) {
  }

  onSubmit(): void {

    this.userLoginService
      .userAuth(this.loginInfo.value.email ?? "", this.loginInfo.value.password ?? "");
  }
}
