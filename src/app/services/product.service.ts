import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }


  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId`+ `?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

































// This method is used for Mastet details about the product
//   getProduct(theProductId: number): Observable<Product> {

//     // need to build URL based on product id
//     const productUrl = `${this.baseUrl}/${theProductId}`;

//     return this.httpClient.get<Product>(productUrl);
//   }

//   //This method is used for side bar category selection 
//   getProductCategories(): Observable<ProductCategory[]> {

//     return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
//       map(response => response._embedded.productCategory)
//     );
//   }


//   //this method is used to get all product form backend and list out at UI
//   getProductList(theCategoryId: number): Observable<Product[]> {

//     // need to build URL based on category id 
//     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

//     return this.getProducts(searchUrl);
//   }


//   this method is used to get all product form backend and with pagination
//   getProductListPaginate( thePage: number,
//                           thePageSize: number,
//                           theCategoryId: number): Observable<GetResponseProducts> {

//     // need to build URL based on category id 
//     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
//                     +`?page=${thePage}&size=${thePageSize}`;

//     return this.httpClient.get<GetResponseProducts>(searchUrl);
//   }







//   //this method is used for search bar to tyoe any name and find products caintian the name in the title.
//   searchProducts(theKeyword: string): Observable<Product[]> {

//     // need to build URL based on the keyword 
//     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

//     return this.getProducts(searchUrl);
//   }




//   // This method will invoke the REST API (GET) and map the JSON response to the product[] by using _embedded keyword.
//   // Observable[] is return type of the method.

//   private getProducts(searchUrl: string): Observable<Product[]> {
//     return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
//   }


// }


// interface GetResponseProducts {
//   _embedded: {
//     products: Product[];
//   }
// }

// interface GetResponseProductCategory {
//   _embedded: {
//     productCategory: ProductCategory[];
//   }
// }


// interface GetResponseProducts {
//   _embedded: {
//     products: Product[];
//   },
//   page: {
//     size: number,
//     totalElements: number,
//     totalPages: number,
//     number: number
//   }
// }

// interface GetResponseProductCategory {
//   _embedded: {
//     productCategory: ProductCategory[];
//   }
// }