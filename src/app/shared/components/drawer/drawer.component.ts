import {
  Component,
  input,
  Renderer2,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
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
  private originalOverflow = signal<string | null>(null);

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
      this.originalOverflow.set(document.body.style.overflow);
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  private restoreBodyScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.originalOverflow !== undefined) {
        this.renderer.setStyle(
          document.body,
          'overflow',
          this.originalOverflow()
        );
      } else {
        this.renderer.removeStyle(document.body, 'overflow');
      }
    }
  }

  closeDrawer() {
    this.drawerService.setDrawerOpen(this.id(), false);
    this.restoreBodyScroll();
  }
}
