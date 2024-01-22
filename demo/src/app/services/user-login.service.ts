import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../interface/authentication_request";
import {USER_BODY} from "../interface/user_body";

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private loginApiUrl: string = "http://localhost:8080/api/v1/auth/authenticate";
  private registerApiUrl: string = "http://localhost:8080/api/v1/auth/register";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  userAuth(email: string, password: string): void {

    const authenticationRequest: AuthenticationRequest = {
      email: email,
      password: password
    };

    this.http.post(this.loginApiUrl, authenticationRequest, this.httpOptions)
      .subscribe((responseBody: any): void => {

        window.localStorage.setItem("auth_token", JSON.stringify(responseBody.token));
        this.router.navigate([""]);

      });
  }

  userRegister(userInfo: USER_BODY) {

    this.http.post(this.registerApiUrl, userInfo, this.httpOptions)
      .subscribe((responseBody: any): void => {

        window.localStorage.setItem("auth_token", JSON.stringify(responseBody.token));
        this.router.navigate([""]);

      });
  }
}
