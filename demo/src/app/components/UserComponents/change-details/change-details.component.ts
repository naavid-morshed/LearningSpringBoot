import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UPDATE_REQUEST} from "../../../dto/update_request";
import {USER} from "../../../dto/user";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {LocalStoreService} from "../../../services/local-store.service";
import {environment} from "../../../environments/environment";

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
    currentEmail: ["", Validators.required],
    newEmail: [""],
    confirmPassword: ["", Validators.required],
    newPassword: [""],
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
    this.httpService.get(`${environment.serverUrl}/api/v1/user`)
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
            currentEmail: response.email,
            address: response.address,
          });
        },
      })
  }

  onSubmit(): void {

    const updateInfo: UPDATE_REQUEST = {
      firstName: this.updateForm.value.firstName ?? "",
      lastName: this.updateForm.value.lastName ?? "",
      oldEmail: this.updateForm.value.currentEmail ?? "",
      newEmail: this.updateForm.value.newEmail ?? "",
      oldPass: this.updateForm.value.confirmPassword ?? "",
      newPass: this.updateForm.value.newPassword ?? "",
      address: this.updateForm.value.address ?? "",
    };

    this.httpService.post(`${environment.authUrl}/updateuser`, updateInfo)
      .pipe(
        map((r: any) => {
          return r.token
        })
      )
      .subscribe({
        next: (token: string) => this.localStore.saveData(environment.authKey, token),
        complete: () => this.router.navigate(['myaccount'])
      })
  }

  navigateToMyAccount(): void {
    this.router.navigate(['myaccount'])
  }
}
