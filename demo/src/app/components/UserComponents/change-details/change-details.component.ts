import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UPDATE_REQUEST} from "../../../dto/update_request";
import {USER} from "../../../dto/user";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {LocalStoreService} from "../../../services/local-store.service";
import {ApiUrls} from "../../../environments/api-urls";
import {KeyStore} from "../../../environments/keystorage";
import {RouterUrls} from "../../../environments/route-urls";

@Component({
  selector: 'app-change-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-details.component.html',
})
export class ChangeDetailsComponent implements OnInit {
  updateForm = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    oldEmail: ["", Validators.required],
    newEmail: [""],
    oldPass: ["", Validators.required],
    newPass: [""],
    address: [""],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private localStore: LocalStoreService,
  ) {
  }

  ngOnInit(): void {
    this.httpService.get(`${ApiUrls.serverUrl}/api/v1/user`)
      .pipe(
        map((value: any) => {
          return value as USER;
        })
      )
      .subscribe({
        next: (response: USER): void => {
          this.updateForm.patchValue({
            firstName: response.firstName,
            lastName: response.lastName,
            oldEmail: response.email,
            address: response.address,
          });
        },
      })
  }

  onSubmit(): void {

    // const updateInfo: UPDATE_REQUEST = {
    //   firstName: this.updateForm.value.firstName ?? "",
    //   lastName: this.updateForm.value.lastName ?? "",
    //   oldEmail: this.updateForm.value.currentEmail ?? "",
    //   newEmail: this.updateForm.value.newEmail ?? "",
    //   oldPass: this.updateForm.value.confirmPassword ?? "",
    //   newPass: this.updateForm.value.newPassword ?? "",
    //   address: this.updateForm.value.address ?? "",
    // };

    this.httpService.post(`${ApiUrls.authUrl}/updateuser`, this.updateForm.value as UPDATE_REQUEST)
      .pipe(
        map((r: any) => {
          return r.token
        })
      )
      .subscribe({
        next: (token: string) => this.httpService.jwt = token,
        complete: () => this.router.navigate([RouterUrls.myaccount.url])
      })
  }

  navigateToMyAccount(): void {
    this.router.navigate([RouterUrls.myaccount.url])
  }
}
