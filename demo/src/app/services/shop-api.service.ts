import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PRODUCT} from "../interface/PRODUCT";
import {Observable} from "rxjs";
import {Product_body} from "../interface/product_body";
import {ORDER_BODY} from "../interface/order_body";

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {
  constructor(private http: HttpClient) {
  }

  private productApiUrl: string = "http://localhost:8080/api/v1/product";
  private orderApiUrl: string = "http://localhost:8080/api/v1/order";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getProductJSON(): Observable<PRODUCT[]> {
    return this.http.get<PRODUCT[]>(this.productApiUrl);
  }

  addProduct(product: Product_body): Observable<Product_body> {
    return this.http.post<Product_body>(`${this.productApiUrl}/addProduct`, product, this.httpOptions);
  }


  updateProduct(product: PRODUCT): Observable<Product_body> {
    const productBody: Product_body = {
      "name": product.name,
      "specifications": product.specifications,
      "price": product.price
    };

    return this.http.put<Product_body>(
      `${this.productApiUrl}/id/${product.id}`,
      productBody,
      this.httpOptions
    )
  }

  deleteToDo(product: PRODUCT): Observable<PRODUCT> {
    return this.http.delete<PRODUCT>(`${this.productApiUrl}/id/${product.id}`);
  }

  createOrder(order: ORDER_BODY): Observable<ORDER_BODY>{
    return this.http.post<ORDER_BODY>(this.orderApiUrl,order,this.httpOptions);
  }
}
