import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }           /* Injecting our ProductService in to out ProductListComponent */

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductList().subscribe(          /* Method is invoked once you "subscribe" */
      data => {                                            
        this.products = data;                                  /* Assign results to the Product array
                                                                 * this is same as integrating our ProductService with ProductList Component
                                                                */
      }
    )
  }

}
