import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../../../dto/authentication_request";
import {HttpService} from "../../../../services/http.service";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

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

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
  }

  onSubmit(): void {

    const authenticationRequest: AuthenticationRequest = {
      email: this.loginInfo.value.email ?? "",
      password: this.loginInfo.value.password ?? ""
    };

    this.httpService.post(`${environment.authUrl}/authenticate`, authenticationRequest)
      .pipe(
        map((responseBody: any) => {
            return responseBody.token;
          }
        )
      )
      .subscribe({
        next: (token: string) => this.httpService.jwt = token,
        complete: () => this.router.navigate([""]),
      });
  }

  navigateToRegisterPage() {
    this.router.navigate(['register'])
  }
}
