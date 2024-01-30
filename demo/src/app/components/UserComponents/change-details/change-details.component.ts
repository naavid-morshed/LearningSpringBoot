import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {USER_BODY} from "../../../interface/user_body";
import {UPDATE_REQUEST} from "../../../interface/update_request";
import {USER} from "../../../interface/user";
import {Router} from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe(
      (r: USER): void => this.updateForm.patchValue({
        firstName: r.firstName,
        lastName: r.lastName,
        currentEmail: r.email,
        address: r.address,
      })
    )
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

    this.userService.updateUser(updateInfo);
  }

  navigateToMyAccount(): void {
    this.router.navigate(['myaccount'])
  }
}
