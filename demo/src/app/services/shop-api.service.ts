import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PRODUCT} from "../interface/product";
import {Observable, Subscription} from "rxjs";
import {PRODUCT_BODY} from "../interface/product_body";
import {ORDER_BODY} from "../interface/order_body";
import {ORDER} from "../interface/order";
import {PBWC} from "../interface/product_body_without_code";
import {FormGroup, ɵElement} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {
  constructor(private httpClient: HttpClient) {
  }

  private productApiUrl: string = "http://localhost:8080/api/v1/product";
  private orderApiUrl: string = "http://localhost:8080/api/v1/order";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("auth_token") ?? "")
    }),
  };

  getProductJSON(): Observable<PRODUCT[]> {
    return this.httpClient.get<PRODUCT[]>(this.productApiUrl, this.httpOptions);
  }

  getProductById(id: number): Observable<PRODUCT> {
    return this.httpClient.get<PRODUCT>(`${this.productApiUrl}/productId/${id}`, this.httpOptions);
  }

  // getProductByListOfId(idList: number[]): Observable<PRODUCT[]> {
  //   let idStr: string = "";
  //
  //   idList.forEach((id: number, index: number): void => {
  //     if (index !== idList.length - 1) {
  //       idStr += id + ",";
  //     } else {
  //       idStr += id;
  //     }
  //   });
  //
  //   return this.http.get<PRODUCT[]>(`${this.productApiUrl}/getListOfProducts?&idList=${idStr}`);
  // }

  addProduct(product: PBWC):Observable<PRODUCT> {

    return this.httpClient.post<PRODUCT>(
      `${this.productApiUrl}/addProduct`,
      product,
      this.httpOptions
    );
  }

  updateProduct(product: PRODUCT): Subscription {

    return this.httpClient.put<PRODUCT>(
      `${this.productApiUrl}/update`,
      product,
      this.httpOptions
    ).subscribe((responseBody: PRODUCT): boolean => {
      return responseBody.id !== null;
    });
  }

  deleteToDo(product: PRODUCT): Observable<PRODUCT> {
    return this.httpClient.delete<PRODUCT>(`${this.productApiUrl}/id/${product.id}`, this.httpOptions);
  }

  createOrder(order: ORDER_BODY): Observable<ORDER> {
    return this.httpClient.post<ORDER>(this.orderApiUrl, order, this.httpOptions);
  }

  getOrderById(id: string): Observable<ORDER> {
    return this.httpClient.get<ORDER>(`${this.orderApiUrl}/id/${id}`, this.httpOptions);
  }

  gerOrderList(): Observable<ORDER[]> {
    return this.httpClient.get<ORDER[]>(`${this.orderApiUrl}s`, this.httpOptions);
  }
}
