import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProduct, ListProducts, UpdateProduct } from './products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  addProduct(product: AddProduct) {
    return this.http.post<AddProduct>(
      'https://fakestoreapi.com/products',
      product
    );
  }

  getAllProducts() {
    return this.http.get<ListProducts[]>('https://fakestoreapi.com/products');
  }

  updateProduct(product: UpdateProduct) {
    return this.http.put<UpdateProduct>(
      'https://fakestoreapi.com/products/' + product.id,
      product
    );
  }
}
