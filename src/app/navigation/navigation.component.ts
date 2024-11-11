import { Component, signal } from '@angular/core';
import { DrawerService } from '../shared/services/drawer.service';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { Router, RouterLink } from '@angular/router';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { Drawers } from '../shared/models/drawer.enum';
import { AuthService } from '../admin/auth.service';
import { AvatarComponent } from '../shared/components/avatar/avatar.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { CartComponent } from '../cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    DrawerComponent,
    RouterLink,
    AddProductComponent,
    AvatarComponent,
    IconComponent,
    CartComponent,
    MatBadgeModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  drawers = signal(Drawers);
  constructor(
    private drawerService: DrawerService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  openNavDrawer() {
    this.drawerService.setDrawerOpen(Drawers.NavigationDrawer, true);
  }

  openAddProductDrawer() {
    this.drawerService.setDrawerOpen(Drawers.AddProductDrawer, true);
  }

  closeDrawer() {
    this.drawerService.setDrawerOpen(Drawers.NavigationDrawer, false);
  }

  isAddProductDrawerOpen() {
    return this.drawerService.isDrawerOpen(Drawers.AddProductDrawer);
  }

  isNavigationDrawerOpen() {
    return this.drawerService.isDrawerOpen(Drawers.NavigationDrawer);
  }

  navigateToAdminPage() {
    this.router.navigate(['admin']);
  }

  isCartDrawerOpen() {
    return this.drawerService.isDrawerOpen(Drawers.CartDrawer);
  }

  openCart() {
    this.drawerService.setDrawerOpen(Drawers.CartDrawer, true);
  }

  get getCartProductsCount() {
    return this.cartService.getCartProducts().length;
  }
}
