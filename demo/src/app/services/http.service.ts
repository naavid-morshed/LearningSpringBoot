import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  get isLoggedIn(): boolean {
    return !!this.jwt
  }

  get jwt(): string {
    return JSON.parse(localStorage.getItem(environment.auth_token) ?? "");
  }

  private set jwt(token: string) {
    localStorage.setItem(environment.auth_token, JSON.stringify(token));
  }
}
