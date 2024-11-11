import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddProductInterface,
  GetProductInterface,
  UpdateProductInterface,
} from '../models/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  addProduct(product: AddProductInterface) {
    return this.http.post<AddProductInterface>(
      'https://fakestoreapi.com/products',
      product
    );
  }

  getAllProducts() {
    return this.http.get<GetProductInterface[]>(
      'https://fakestoreapi.com/products'
    );
  }

  updateProduct(product: UpdateProductInterface) {
    return this.http.put<UpdateProductInterface>(
      'https://fakestoreapi.com/products/' + product.id,
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete('https://fakestoreapi.com/products/' + id);
  }

  getLimitedProducts(count: number) {
    return this.http.get<GetProductInterface[]>(
      'https://fakestoreapi.com/products?limit=' + count
    );
  }
}
