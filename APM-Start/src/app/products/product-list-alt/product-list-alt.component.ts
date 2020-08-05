import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, EMPTY } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent implements OnDestroy {
  pageTitle = 'Products';
  errorMessage = '';
  selectedProductId;
  
  products: Product[] = [];
  sub: Subscription;

  products$ = this.productService.products$ 
    .pipe( // pipe the Observable through the catchError operator
      catchError(err => { 
        this.errorMessage = err;
        return EMPTY; //or... return of([]);
      })
  );

  constructor(private productService: ProductService) { }
 

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
