import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../../../dto/authentication_request";
import {HttpService} from "../../../../services/http.service";
import {map} from "rxjs/operators";
import {ApiUrls} from "../../../../environments/api-urls";
import {RouterUrls} from "../../../../environments/route-urls";

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
    this.httpService.post(
      `${ApiUrls.authUrl}/authenticate`,
      this.loginInfo.value as AuthenticationRequest
    )
      .pipe(
        map((responseBody: any) => {
            return responseBody.token as string;
          }
        )
      )
      .subscribe({
        next: (token: string) => this.httpService.jwt = token,
        complete: () => this.router.navigate([RouterUrls.homePage.url]),
      });
  }

  navigateToRegisterPage() {
    this.router.navigate([RouterUrls.register.url])
  }
}
