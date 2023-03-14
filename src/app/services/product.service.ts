import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'              /*rxjs is reactive JavaScripts to map data comming from spring Data RESt in to pipe*/
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }




  getProductList(thecatergoryId: number): Observable<Product[]> {               /* getProductList() is a method and it will return Product[] array*/

  const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${thecatergoryId}`;

  
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)                              /* Returns an observable Map the JSON data from Spring Data REST to product array*/
    );
  }

  



  getProductCategories(): Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )

  }
}

interface GetResponseProducts {
  _embedded: {                                                /* Unwraps the JSON from Spring Data REST _embedded entry*/
    products: Product[];
  }
}



interface GetResponseProductCategory {
    _embedded: {                                                /* Unwraps the JSON from Spring Data REST _embedded entry*/
      productCategory: ProductCategory[];
    }
}