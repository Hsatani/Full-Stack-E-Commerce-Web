import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'              /*rxjs is reactive JavaScripts to map data comming from spring Data RESt in to pipe*/

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {               /* getProductList() is a method and it will return Product[] array*/
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)                              /* Returns an observable Map the JSON data from Spring Data REST to product array*/
    );
  }
}

interface GetResponse {
  _embedded: {                                                /* Unwraps the JSON from Spring Data REST _embedded entry*/
    products: Product[];
  }
}