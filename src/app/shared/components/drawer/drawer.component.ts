import { Component, input, Renderer2, Inject, OnInit } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent implements OnInit {
  direction = input<'right' | 'left'>('left');
  id = input<string>('');

  constructor(
    public drawerService: DrawerService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.removeBodyScroll();
  }

  private removeBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  closeDrawer() {
    this.drawerService.setDrawerOpen(this.id(), false);
  }
}
