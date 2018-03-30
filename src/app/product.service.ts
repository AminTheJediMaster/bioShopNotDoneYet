import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  //crud

  create(product){
    this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  getById(productId){
    return this.db.object('/products/'+ productId);
  }

  update(productId, product){
    this.db.object('/products/'+productId).update(product);
  }
  delete(productId){
    return this.db.object('products/'+productId).remove();
  }

}
