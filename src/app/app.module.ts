import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, RouterOutlet} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component'

const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},                         /* category/:id -> is a path to match and when it matches,  it will gonna new instance of component -> ProductListComponent */
  {path: 'products', component: ProductListComponent},                         /* Order of the routed is important First match wins. Strart from most specific to generic. */
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
                                                                   

@NgModule({ 
  declarations: [
    AppComponent,              
    ProductListComponent, ProductCategoryMenuComponent, SearchComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(routes),         /* An array of Route objects that define the navigation paths for the application. Creates and configures a module with all the router providers and directives.*/
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }