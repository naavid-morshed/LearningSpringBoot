import {Component, OnInit} from '@angular/core';
import {USER} from "../../../interface/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent implements OnInit {
  user: USER = {} as USER;

  public address: string = "";
  // public addressInstance: string = localStorage.getItem(this.userService.returnKey()) ?? this.userService.returnPseudoAddress();

  constructor(private userLoginService: UserService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userLoginService.getUserDetails().subscribe(
      (response: USER): void => {
        this.user = response;
        this.address = response.address
      }
    )
  }

  logOut(): void {

    localStorage.removeItem("auth_token");
    localStorage.removeItem("Cart");
    localStorage.removeItem("WishList");

    this.router.navigate(["login"]);
  }

  navigateToChangeDetails() {
    this.router.navigate(['updater']);
  }

  changeAddress() {
    this.userService.updateAddress(this.address);

    // this.address = this.addressInstance;
    // localStorage.removeItem(UserService.addressKey);
    // localStorage.setItem(UserService.addressKey, this.address);
    // console.log(this.address,this.addressInstance);
  }

  navigateToHome() {
    this.router.navigate([""])
  }
}
