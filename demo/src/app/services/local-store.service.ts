import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  public saveData(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  public getData(key: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key) ?? ""
    }
    return "";
  }

  public removeData(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  public clearData(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }

  // public saveData(key: string, value: string): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem(key, JSON.stringify(value));
  //   }
  // }
  //
  // public getData(key: string): string {
  //   if (isPlatformBrowser(this.platformId)) {
  //     return JSON.parse(localStorage.getItem(key) ?? "")
  //   }
  //   return "";
  // }
}
