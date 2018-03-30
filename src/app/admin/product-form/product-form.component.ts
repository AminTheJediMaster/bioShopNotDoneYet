import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  //$ means it is observable
  categories$;
  id;
  //in java product=null;
  product= {};

  constructor(
       //for getAll()
      private router : Router,
       //for getById():
      private activatedRoute: ActivatedRoute,
      private categoryService: CategoryService,
      private productService: ProductService,
  
    
    ) {

    this.categories$ = categoryService.getAll();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    //get only one item
    if(this.id) this.productService.getById(this.id).take(1).subscribe( p => this.product = p);
  
  
  }

   save(product){
     console.log(product);
     if(this.id) this.productService.update(this.id, product);
     else this.productService.create(product);
     this.router.navigate(['/admin/products']);
   }

    delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    //remove it
    this.productService.delete(this.id);
    //after deleting navigate to '/admin/products'
    this.router.navigate(['/admin/products']);
  } 

  ngOnInit() {
  }

}
