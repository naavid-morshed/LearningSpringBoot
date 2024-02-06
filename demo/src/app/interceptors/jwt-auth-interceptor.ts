import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpService} from "../services/http.service";
import {ApiUrls} from "../environments/api-urls";

@Injectable({
  providedIn: 'root',
}) // DI based interceptor not preferred by angular and may be phased out in latter releases
export class JwtAuthInterceptor implements HttpInterceptor {
  constructor(private httpService: HttpService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isLoggedIn: boolean = this.httpService.isLoggedIn;
    const isToServer: boolean = req.url.startsWith(ApiUrls.serverUrl);

    if (isLoggedIn && isToServer) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${this.httpService.jwt}`},
      });
    }

    return next.handle(req)
  }

}
