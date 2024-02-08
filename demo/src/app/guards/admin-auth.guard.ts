import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {HttpService} from "../services/http.service";
import {RouterUrls} from "../environments/route-urls";

export const adminAuthGuard: CanActivateFn = (route, state) => {
  // const isLoggedIn: boolean = inject(HttpService).isLoggedIn.subscribe({
  //   next:value => {
  //     return value
  //   }
  // });

  // if (isLoggedIn) {
  //   return isLoggedIn;
  // } else {
  //   inject(Router).navigate([RouterUrls.adminLogIn.url])
  //   return isLoggedIn;
  // }

  return false
};
