import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  get isThisPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public saveData(key: string, data: object | string): void {
    if (this.isThisPlatformBrowser) {
      localStorage.setItem(
        key,
        (typeof data === 'object') ? JSON.stringify(data) : data as string
      );
    }
  }

  public hasData(key: string): boolean {
    if (this.isThisPlatformBrowser) {
      return !!localStorage.getItem(key);
    } else {
      return false;
    }
  }

  public getData(key: string): object | string {
    if (this.isThisPlatformBrowser) {
      const item: string = localStorage.getItem(key) ?? "";
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } else {
      return "";
    }

  }

  public removeData(key: string): void {
    if (this.isThisPlatformBrowser) {
      localStorage.removeItem(key);
    }
  }

  public clearData(): void {
    if (this.isThisPlatformBrowser) {
      localStorage.clear();
    }
  }
}
