import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CartService } from './service/cart.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/components/icon/icon.component';
import { Router } from '@angular/router';
import { DrawerService } from '../shared/services/drawer.service';
import { Drawers } from '../shared/models/drawer.enum';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonComponent, CommonModule, IconComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    private cartService: CartService,
    private router: Router,
    private drawerService: DrawerService
  ) {}

  isDisabled() {
    return this.cartService.getCartProducts().length === 0;
  }

  get cartProducts() {
    return this.cartService.getCartProducts();
  }

  removeProduct(id: string) {
    this.cartService.deleteCartProduct(id);
  }

  navigateToCheckOut() {
    this.drawerService.setDrawerOpen(Drawers.CartDrawer, false);
    this.router.navigate(['/checkout']);
  }
}
