import { Injectable, signal } from '@angular/core';
import { GetProductInterface } from '../models/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts = signal<GetProductInterface[]>([]);

  constructor() {}

  addToCart(product: GetProductInterface) {
    this.cartProducts().push(product);
  }

  deleteCartProduct(productId: string) {
    let productIndex = this.cartProducts().findIndex(
      (item) => item.id === productId
    );
    this.cartProducts().splice(productIndex, 1);
  }

  getCartProducts() {
    return this.cartProducts();
  }

  clearCart() {
    this.cartProducts.set([]);
  }
}
