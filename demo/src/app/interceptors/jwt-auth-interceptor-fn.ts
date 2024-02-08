import {inject} from "@angular/core";
import {HttpService} from "../services/http.service";
import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {ApiUrls} from "../environments/api-urls";
import {LocalStoreService} from "../services/local-store.service";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (
    inject(LocalStoreService).isThisPlatformBrowser &&
    inject(HttpService).isLoggedIn &&
    req.url.startsWith(ApiUrls.serverUrl)
  ) {
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${inject(HttpService).jwt}`},
    });
  }
  return next(req);
}
