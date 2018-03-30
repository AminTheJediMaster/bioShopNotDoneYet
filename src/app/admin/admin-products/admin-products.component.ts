import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/products';
;

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

   products: Product[];
   filteredProducts: any[];
   subcription: Subscription;

     //$ means it is observable
  categories$;
  id;
  //in java product=null;
  product= {};


  constructor(
    private productService: ProductService,
  
    private router : Router,
    //for getById():
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
  
  ) {
   this.subcription = this.productService.getAll()
   .subscribe(products =>this.filteredProducts = this.products = products);


    this.categories$ = categoryService.getAll();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    //get only one item
    if(this.id) this.productService.getById(this.id).take(1).subscribe( p => this.product = p);
  


   }

   delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    //remove it
    this.productService.delete(this.id);
    //after deleting navigate to '/admin/products'
    this.router.navigate(['/admin/products']);
  } 

  filter(query: string){
    console.log(query);
    this.filteredProducts=(query)?
        this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
        this.products;
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }



  ngOnInit() {
  }

}
