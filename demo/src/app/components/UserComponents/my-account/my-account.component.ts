import {Component, OnInit} from '@angular/core';
import {USER} from "../../../dto/user";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LocalStoreService} from "../../../services/local-store.service";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {ApiUrls} from "../../../environments/api-urls";
import {KeyStore} from "../../../environments/keystorage";
import {RouterUrls} from "../../../environments/route-urls";
import {SsrCookieService} from "ngx-cookie-service-ssr";

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

  constructor(
    private localStore: LocalStoreService,
    private router: Router,
    private httpService: HttpService,
    private cookieService: SsrCookieService,
  ) {
  }

  ngOnInit(): void {
    this.httpService.get(`${ApiUrls.serverUrl}/api/v1/user`)
      .pipe(
        map(r => {
          return r as USER;
        })
      )
      .subscribe(
        (response: USER): void => {
          this.user = response;
          this.address = response.address
        }
      )
  }

  logOut(): void {

    this.cookieService.delete(KeyStore.authKey);

    this.router.navigate([RouterUrls.login.url]);
  }

  navigateToChangeDetails(): void {
    this.router.navigate([RouterUrls.changeDetails.url]);
  }

  changeAddress(): void {
    this.httpService.post("http://localhost:8080/api/v1/auth/updateAddress", this.address).subscribe();
  }

  navigateToHome(): void {
    this.router.navigateByUrl(RouterUrls.homePage.url)
  }
}
