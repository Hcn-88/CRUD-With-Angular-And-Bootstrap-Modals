import { Product } from './Product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';

  product?: Product
  products: Product[] = []

  onSubmit(product: Product){
    this.products.push(product)
  }

  onSelect(id: number){
    this.product = this.products[id];
    this.product!.id = id;
  }

  onDelete(id: number) {
    this.products = this.products.filter((item, indice) => indice != id)
  }

  onEdit(product: Product) {
    let id = product.id!;
    this.products[id] = product;
    return this.products;
  }

}
