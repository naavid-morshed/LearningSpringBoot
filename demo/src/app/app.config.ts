import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch, withInterceptors,} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {AuthInterceptor} from "./interceptors/jwt-auth-interceptor-fn";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // for providing routes
    provideClientHydration(), // for SSR

    provideHttpClient(
      withFetch(), // withFetch() uses fetch api, removing withFetch()
      // will use XMLHttpRequest, fetch api is a more powerful and flexible
      // replacement for XMLHttpRequest.

      withInterceptors([AuthInterceptor])

      // withInterceptorsFromDi(),
    ),

    provideAnimations(), // required animations providers
    provideToastr({ // global toastr config
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),

    // { // provide global bearer token for all components after login through http interceptor
    //   provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true
    // }
  ]
};
