import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminLoginService} from "../../../../services/admin-login.service";
import {AuthenticationRequest} from "../../../../interface/authentication_request";
import {USER_BODY} from "../../../../interface/user_body";
import {UserLoginService} from "../../../../services/user-login.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerInfo = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private userLoginService: UserLoginService) {
  }

  onSubmit(): void {

    const registrationInfo: USER_BODY = {
      firstName: this.registerInfo.value.firstName ?? "",
      lastName: this.registerInfo.value.lastName ?? "",
      email: this.registerInfo.value.email ?? "",
      password: this.registerInfo.value.password ?? "",
    };

    this.userLoginService
      .userRegister(registrationInfo);
  }
}
