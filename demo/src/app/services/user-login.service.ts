import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../interface/authentication_request";
import {USER_BODY} from "../interface/user_body";
import {Observable} from "rxjs";
import {USER} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private loginApiUrl: string = "http://localhost:8080/api/v1/auth/authenticate";
  private registerApiUrl: string = "http://localhost:8080/api/v1/auth/register";
  private userDetailsApiUrl: string = "http://localhost:8080/api/v1/user";

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

        localStorage.setItem("auth_token", JSON.stringify(responseBody.token));
        this.router.navigate([""]);

      });
  }

  userRegister(userInfo: USER_BODY): void {

    this.http.post(this.registerApiUrl, userInfo, this.httpOptions)
      .subscribe((responseBody: any): void => {

        localStorage.setItem("auth_token", JSON.stringify(responseBody.token));
        this.router.navigate([""]);

      });
  }

  getUserDetails(): Observable<USER> {
    return this.http.get<USER>(
      this.userDetailsApiUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("auth_token") ?? "")
        }),
      }
    )
  }
}
