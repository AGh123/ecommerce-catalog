import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DrawerService } from '../shared/services/drawer.service';
import { DrawerComponent } from '../shared/drawer/drawer.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatIconModule, DrawerComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  constructor(private drawerService: DrawerService) {}

  openDrawer() {
    this.drawerService.isDrawerOpen.set(true);
  }
}
