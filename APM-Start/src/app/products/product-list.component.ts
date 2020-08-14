import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './product.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.productsWithCategory$ 
    .pipe( // pipe the Observable through the catchError operator
      catchError(err => { 
        this.errorMessage = err;
        return EMPTY; //or... return of([]);
      })
  );

  constructor(private productService: ProductService) { }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
