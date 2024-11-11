import { Component, signal } from '@angular/core';
import { DrawerService } from '../shared/services/drawer.service';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { Router, RouterLink } from '@angular/router';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { DrawersEnum } from '../shared/models/drawer.enum';
import { AuthService } from '../shared/services/auth.service';
import { AvatarComponent } from '../shared/components/avatar/avatar.component';
import { IconComponent } from '../shared/components/icon/icon.component';
import { CartComponent } from '../cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../shared/services/cart.service';

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
  drawers = signal(DrawersEnum);
  constructor(
    private drawerService: DrawerService,
    public authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  openNavDrawer() {
    this.drawerService.setDrawerStatus(DrawersEnum.NavigationDrawer, true);
  }

  openAddProductDrawer() {
    this.drawerService.setDrawerStatus(DrawersEnum.AddProductDrawer, true);
  }

  closeDrawer() {
    this.drawerService.setDrawerStatus(DrawersEnum.NavigationDrawer, false);
  }

  isAddProductDrawerOpen() {
    return this.drawerService.isDrawerOpen(DrawersEnum.AddProductDrawer);
  }

  isNavigationDrawerOpen() {
    return this.drawerService.isDrawerOpen(DrawersEnum.NavigationDrawer);
  }

  navigateToAdminPage() {
    this.router.navigate(['admin']);
  }

  isCartDrawerOpen() {
    return this.drawerService.isDrawerOpen(DrawersEnum.CartDrawer);
  }

  openCart() {
    this.drawerService.setDrawerStatus(DrawersEnum.CartDrawer, true);
  }

  get getCartProductsCount() {
    return this.cartService.getCartProducts().length;
  }
}
