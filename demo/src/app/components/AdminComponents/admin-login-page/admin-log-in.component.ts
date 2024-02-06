import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../../dto/authentication_request";
import {HttpService} from "../../../services/http.service";
import {USER} from "../../../dto/user";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {LocalStoreService} from "../../../services/local-store.service";
import {ApiUrls} from "../../../environments/api-urls";
import {KeyStore} from "../../../environments/keystorage";
import {RouterUrls} from "../../../environments/route-urls";

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

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router,
    private localStore: LocalStoreService,
  ) {
  }

  onSubmit(): void {
    const loginInfo: AuthenticationRequest = {
      email: this.loginInfo.value.name ?? "",
      password: this.loginInfo.value.password ?? "",
    };

    this.httpService
      .post(`${ApiUrls.authUrl}/authenticate`, loginInfo)
      .subscribe({
        next: (r: any) => {
          const response: USER = r.user;
          const token: string = r.token;

          if (response.role === "ADMIN") {
            this.localStore.saveData(KeyStore.authKey, token);

            this.router.navigateByUrl(RouterUrls.adminPanel.url).catch(error => {
              this.toastr.error("Navigation error: ", error);
            });

          } else {
            this.toastr.error("You are not authorized to use admin panel.");
          }
        },
      });
  }
}
