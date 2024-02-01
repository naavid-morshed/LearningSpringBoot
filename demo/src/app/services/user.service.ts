import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../dto/authentication_request";
import {USER_BODY} from "../dto/user_body";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {USER} from "../dto/user";
import {UPDATE_REQUEST} from "../dto/update_request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public static readonly addressKey: string = "address";
  public static readonly pseudoAddress: string = "Current Location, Check My Account to update";

  constructor(private http: HttpClient, private router: Router) {
  }

  private loginApiUrl: string = "http://localhost:8080/api/v1/auth/authenticate";
  private registerApiUrl: string = "http://localhost:8080/api/v1/auth/register";
  private userDetailsApiUrl: string = "http://localhost:8080/api/v1/user";
  private updateUserApiUrl: string = "http://localhost:8080/api/v1/auth/updateuser";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  returnKey(): string {
    return UserService.addressKey;
  }

  returnPseudoAddress(): string {
    return UserService.pseudoAddress;
  }

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

  updateUser(updatedDetails: UPDATE_REQUEST) {
    this.http.post<any>(
      this.updateUserApiUrl,
      updatedDetails,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("auth_token") ?? "")
        }),
      }
    ).pipe(
      map(r => {
        return r.token
      })
    ).subscribe(
      r => {
        console.log(r)
        localStorage.removeItem("auth_token")
        localStorage.setItem("auth_token", JSON.stringify(r));

        this.router.navigate(['myaccount']);
      }
    )
  }

  updateAddress(address: string) {
    this.http.post(
      `http://localhost:8080/api/v1/auth/updateAddress`,
      address,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("auth_token") ?? "")
        }),
      }
    ).subscribe()
  }
}
