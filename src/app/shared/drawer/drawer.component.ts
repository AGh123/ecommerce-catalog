import { Component, input, Renderer2, Inject } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  direction = input<'right' | 'left'>('left');

  constructor(
    public drawerService: DrawerService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.removeBodyScroll();
  }

  private removeBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  private resetBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  closeDrawer() {
    this.drawerService.isDrawerOpen.set(false);
    this.resetBodyScroll();
  }

  ngOnDestroy() {
    this.resetBodyScroll();
  }
}
