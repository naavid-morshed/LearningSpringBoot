import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PRODUCT} from "../interface/product";
import {AuthenticationRequest} from "../interface/authentication_request";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  getJwtToken(email: string, password: string): void {

    const authenticationRequest: AuthenticationRequest = {
      email: email,
      password: password
    };

    this.http.post<any>(this.loginApiUrl, authenticationRequest, this.httpOptions)
      .subscribe((responseBody: any): void => {
        if (this.getAuthToken() == null) {
          window.localStorage.setItem("auth_token", JSON.stringify(responseBody.token));

          if (this.getAuthToken() !== null) {
            this.router.navigate(["adminPanel"]);
          }

        } else {

          if (this.getAuthToken() !== null) {
            this.router.navigate(["adminPanel"]);
          }
        }

      });
  }
}
