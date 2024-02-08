// import {
//   HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor,
//   HttpRequest
// } from '@angular/common/http';
// import {inject, Injectable} from "@angular/core";
// import {Observable} from "rxjs";
// import {HttpService} from "../services/http.service";
// import {ApiUrls} from "../environments/api-urls";
// import {LocalStoreService} from "../services/local-store.service";
//
// @Injectable({
//   providedIn: 'root',
// }) // DI based interceptor not preferred by angular and may be phased out in latter releases
// export class JwtAuthInterceptor implements HttpInterceptor {
//   constructor(
//     private localStoreService: LocalStoreService,
//     private httpService: HttpService,
//   ) {
//   }
//
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // const isLoggedIn: boolean = this.httpService.isLoggedIn;
//     // const isToServer: boolean = req.url.startsWith(ApiUrls.serverUrl);
//
//     if (this.localStoreService.isThisPlatformBrowser) {
//       if (this.httpService.isLoggedIn && req.url.startsWith(ApiUrls.serverUrl)) {
//         req = req.clone({
//           setHeaders: {Authorization: `Bearer ${inject(HttpService).jwt}`},
//         });
//       }
//     }
//
//     return next.handle(req)
//   }
//
// }
