import {Component, OnInit} from '@angular/core';
import {USER} from "../../../interface/user";
import {UserLoginService} from "../../../services/user-login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
})
export class MyAccountComponent implements OnInit {
  user: USER = {} as USER;

  constructor(private userLoginService: UserLoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.userLoginService.getUserDetails().subscribe(
      (response: USER): void => {
        this.user = response;
      }
    )
  }

  logOut(): void {

    localStorage.removeItem("auth_token");
    localStorage.removeItem("Cart");
    localStorage.removeItem("WishList");

    this.router.navigate(["login"]);
  }

}
