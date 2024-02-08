import {Injectable} from '@angular/core';
import {ApiUrls} from "../environments/api-urls";
import {LocalStoreService} from "./local-store.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {KeyStore} from "../environments/keystorage";
import {SsrCookieService} from "ngx-cookie-service-ssr";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: SsrCookieService,
    private localStore:LocalStoreService,
  ) {
  }

  get isLoggedIn() {
    return (this.cookieService.check(KeyStore.authKey))
  }

  get jwt(): string {
    return this.cookieService.get(KeyStore.authKey);
    // return this.localStore.getData(KeyStore.authKey) as string;
  }

  set jwt(token: string) {
    // this.cookieService.delete(KeyStore.authKey)
    this.cookieService.set(KeyStore.authKey, token)
    // this.localStore.saveData(KeyStore.authKey, token)
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
