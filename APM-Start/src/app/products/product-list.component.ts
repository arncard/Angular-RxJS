import { Component, OnInit } from '@angular/core';

import { ProductService } from './product.service';
import { Observable, of, EMPTY } from 'rxjs';
import { Product } from './product';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts()
      .pipe( // pipe the Observable through the catchError operator
        catchError(err => { 
          this.errorMessage = err;
          return EMPTY; //or... return of([]);
        })
      );
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
