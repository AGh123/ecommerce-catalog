import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../shared/services/drawer.service';
import { DrawerComponent } from '../shared/drawer/drawer.component';
import { RouterLink } from '@angular/router';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { Drawers } from '../shared/services/drawer.enum';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatIconModule,
    DrawerComponent,
    RouterLink,
    AddProductComponent,
    MatTooltipModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  drawers = signal(Drawers);
  constructor(private drawerService: DrawerService) {}

  openNavDrawer() {
    this.drawerService.setDrawerOpen(Drawers.NavigationDrawer, true);
  }

  openAddProductDrawer() {
    this.drawerService.setDrawerOpen(Drawers.AddProductDrawer, true);
  }

  closeDrawer() {
    this.drawerService.setDrawerOpen(Drawers.NavigationDrawer, false);
  }
}
