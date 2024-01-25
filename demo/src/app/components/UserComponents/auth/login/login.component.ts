import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private userLoginService: UserService, private router:Router) {
  }

  onSubmit(): void {

    this.userLoginService
      .userAuth(this.loginInfo.value.email ?? "", this.loginInfo.value.password ?? "");
  }

  navigateToRegisterPage() {
    this.router.navigate(['register'])
  }
}
