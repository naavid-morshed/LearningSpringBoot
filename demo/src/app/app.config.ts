import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // for providing routes
    provideClientHydration(), // for SSR
    provideHttpClient(withFetch()), // withFetch() used fetch api, removing withFetch()
    // will use XMLHttpRequest, fetch api is a more powerful and flexible
    // replacement for XMLHttpRequest.

    provideAnimations(), // required animations providers
    provideToastr({ // global toastr config
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ]
};
