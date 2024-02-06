import {Injectable} from '@angular/core';
import {ApiUrls} from "../environments/api-urls";
import {LocalStoreService} from "./local-store.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {KeyStore} from "../environments/keystorage";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private localStore: LocalStoreService,
    private httpClient: HttpClient
  ) {
  }

  get isLoggedIn(): boolean {
    return !!this.jwt
  }

  get jwt(): string {
    return this.localStore.getData(KeyStore.authKey) as string;
    // return localStorage.getItem(environment.auth_token) ?? ""
    // return JSON.parse(localStorage.getItem(environment.auth_token) ?? "");
  }

  set jwt(token: string) {
    this.localStore.saveData(KeyStore.authKey, token)
    // localStorage.setItem(environment.auth_token,token);
    // localStorage.setItem(environment.auth_token, JSON.stringify(token));
  }

  get(url: string): Observable<unknown> {
    return this.httpClient.get<unknown>(url)
  }

  post(url: string, body: unknown): Observable<unknown> {
    return this.httpClient.post<unknown>(url, body)
  }

  put(url: string, body: unknown): Observable<unknown> {
    return this.httpClient.put<unknown>(url, body)
  }

  delete(url: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(url)
  }
}
