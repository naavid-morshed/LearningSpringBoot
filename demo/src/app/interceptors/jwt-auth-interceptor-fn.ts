import {inject} from "@angular/core";
import {HttpService} from "../services/http.service";
import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {environment} from "../environments/environment";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const isLoggedIn: boolean = inject(HttpService).isLoggedIn;
  const isToServer: boolean = req.url.startsWith(environment.serverUrl);
  console.log(isToServer)
  if (isLoggedIn && isToServer) {

    const newReq: HttpRequest<unknown> = req.clone({
      setHeaders: {Authorization: `Bearer ${inject(HttpService).jwt}`},
    });

    return next(newReq);

  } else {
    return next(req);
  }

}
