import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { CategoryService } from './../category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{

//$ means it's observable, so property products is observable

  products$;
  categories$;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
  ) {
      this.products$ = productService.getAll();
      this.categories$ = categoryService.getAll();

      route.queryParamMap.subscribe(params => {
        let category = params.get('category');
      }) ;

   }
   

}
