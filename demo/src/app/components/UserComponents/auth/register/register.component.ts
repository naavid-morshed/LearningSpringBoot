import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {USER_BODY} from "../../../../interface/user_body";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private userLoginService: UserService,private router:Router) {
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

  navigateToLoginPage() {
    this.router.navigate(['login'])
  }
}
