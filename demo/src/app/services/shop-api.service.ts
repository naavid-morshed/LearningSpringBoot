import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PRODUCT} from "../interface/PRODUCT";
import {Observable} from "rxjs";
import {Product_body} from "../interface/product_body";

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {
  constructor(private http: HttpClient) {
  }

  private apiUrl: string = "http://localhost:8080/api/v1/product";

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getProductJSON(): Observable<PRODUCT[]> {
    return this.http.get<PRODUCT[]>(this.apiUrl);
  }

  addProduct(product: Product_body): Observable<Product_body> {
    return this.http.post<Product_body>(this.apiUrl, product);
  }

  updateProduct(product: PRODUCT): Observable<Product_body> {
    const productBody: Product_body = {
      "name": product.name,
      "specifications": product.specifications,
      "price": product.price
    };

    return this.http.put<Product_body>(
      `${this.apiUrl}/id/${product.id}`,
      productBody,
      this.httpOptions
    )
  }

  deleteToDo(product: PRODUCT): Observable<PRODUCT> {
    return this.http.delete<PRODUCT>(`${this.apiUrl}/id/${product.id}`);
  }
}
