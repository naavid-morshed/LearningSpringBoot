import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {USER_BODY} from "../../../../dto/user_body";
import {Router} from "@angular/router";
import {ApiUrls} from "../../../../environments/api-urls";
import {HttpService} from "../../../../services/http.service";
import {map} from "rxjs/operators";
import {LocalStoreService} from "../../../../services/local-store.service";
import {KeyStore} from "../../../../environments/keystorage";
import {RouterUrls} from "../../../../environments/route-urls";

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

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStore: LocalStoreService,
  ) {
  }

  onSubmit(): void {
    this.httpService
      .post(`${ApiUrls.authUrl}/register`, this.registerInfo.value as USER_BODY)
      .pipe(
        map((r: any) => {
          return r.token;
        })
      )
      .subscribe({
        next: (token: string) => this.localStore.saveData(KeyStore.authKey, token),
        complete:() => this.router.navigate([RouterUrls.homePage.url])
      });
  }

  navigateToLoginPage() {
    this.router.navigate([RouterUrls.login.url]);
  }
}
