import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {HttpService} from "../services/http.service";
import {RouterUrls} from "../environments/route-urls";

export const authGuard: CanActivateFn = async (route, state) => {
  const httpService = inject(HttpService);
  const router = inject(Router);

  // Wait for the isLoggedIn promise to resolve
  const isLoggedIn = httpService.isLoggedIn;

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate([RouterUrls.login.url]);
    return false;
  }
};
