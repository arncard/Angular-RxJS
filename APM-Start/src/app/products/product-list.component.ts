import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './product.service';
import { EMPTY, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  
  // 1. Create an action stream
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  // Expose the subject's Observable
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // 2. Conbine the action stream and data stream
  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedAction$      
  ])  
    .pipe( 
      map(([products, selectedCategoryId]) => // this runs every time the user selects a category
        products.filter(product =>
          selectedCategoryId ? product.categoryId === selectedCategoryId : true  
        )),
      catchError(err => { // pipe the Observable through the catchError operator
        this.errorMessage = err;
        return EMPTY; //or... return of([]);
      })
  );

  categories$ = this.productCategoryService.productCategories$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  
  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) { }


  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    // 3. Emit a value to the action stream when the action occurs
    this.categorySelectedSubject.next(+categoryId);
  }
}
