import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {USER_BODY} from "../../../../dto/user_body";
import {Router} from "@angular/router";
import {ApiUrls} from "../../../../environments/api-urls";
import {HttpService} from "../../../../services/http.service";
import {map} from "rxjs/operators";
import {LocalStoreService} from "../../../../services/local-store.service";
import {KeyStore} from "../../../../environments/keystorage";

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

    const registrationInfo: USER_BODY = {
      firstName: this.registerInfo.value.firstName ?? "",
      lastName: this.registerInfo.value.lastName ?? "",
      email: this.registerInfo.value.email ?? "",
      password: this.registerInfo.value.password ?? "",
    };

    this.httpService
      .post(`${ApiUrls.authUrl}/register`, registrationInfo)
      .pipe(
        map((r: any) => {
          return r.token;
        })
      )
      .subscribe({
        next: (token: string) => this.localStore.saveData(KeyStore.authKey, token),
        complete:() => this.router.navigate([""])
      });
  }

  navigateToLoginPage() {
    this.router.navigate(['login']);
  }
}
