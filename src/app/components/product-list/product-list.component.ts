import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute ) { }           /* Injecting our ProductService in to out ProductListComponent, Inject the ActivatedRoute*/
                                                            /* The current active route that loaded the component. Useful for accessing route parameters. */
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
 
  listProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;                 // ! -> This is the non null assertion operator. Tells compiler that the object is not null
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(      /* Method is invoked once you "subscribe" *//* Assign results to the Product array
                                                                                   * this is same as integrating our ProductService with ProductList Component */
                                                                                                                                                      
      data => {
        this.products = data;
      }
    )
  }
}

 

