import {Component, OnInit} from '@angular/core';
import {USER} from "../../../dto/user";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LocalStoreService} from "../../../services/local-store.service";
import {HttpService} from "../../../services/http.service";
import {map} from "rxjs/operators";
import {ApiUrls} from "../../../environments/api-urls";
import {KeyStore} from "../../../environments/keystorage";

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

  // public addressInstance: string = localStorage.getItem(this.userService.returnKey()) ?? this.userService.returnPseudoAddress();

  constructor(
    private localStore: LocalStoreService,
    private router: Router,
    private httpService: HttpService
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

    this.localStore.removeData(KeyStore.authKey);

    this.router.navigate(["login"]);
  }

  navigateToChangeDetails(): void {
    this.router.navigate(['updater']);
  }

  changeAddress(): void {
    this.httpService.post("http://localhost:8080/api/v1/auth/updateAddress", this.address).subscribe();
  }

  navigateToHome(): void {
    this.router.navigateByUrl("")
  }
}
