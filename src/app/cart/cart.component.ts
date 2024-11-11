import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CartService } from './service/cart.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/components/icon/icon.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonComponent, CommonModule, IconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  isDisabled() {
    return this.cartService.getCartProducts().length === 0;
  }

  get cartProducts() {
    return this.cartService.getCartProducts();
  }

  removeProduct(id: string) {
    this.cartService.deleteCartProduct(id);
  }
}
