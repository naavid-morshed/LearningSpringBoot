import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PRODUCT} from "../interface/product";
import {AuthenticationRequest} from "../interface/authentication_request";
import {Router} from "@angular/router";
import {USER} from "../interface/user";
import {USER_BODY} from "../interface/user_body";

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private loginApiUrl: string = "http://localhost:8080/api/v1/auth/authenticate";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  adminAuth(email: string, password: string): void {

    const authenticationRequest: AuthenticationRequest = {
      email: email,
      password: password
    };

    this.http.post(this.loginApiUrl, authenticationRequest, this.httpOptions)
      .subscribe((responseBody: any): void => {
        const user: USER = responseBody.user;

        if (user.role === "ADMIN") {

          if (this.getAuthToken() == null) {
            window.localStorage.setItem("auth_token", JSON.stringify(responseBody.token));
            this.router.navigate(["adminPanel"]);
          } else {
            this.router.navigate(["adminPanel"]);
          }

        } else {
          console.log("You are not authorized to use admin panel.")
        }

      });
  }

}