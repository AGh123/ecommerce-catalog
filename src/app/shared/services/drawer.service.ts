import { Injectable, signal } from '@angular/core';
import { Drawer } from '../models/drawer.interface';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerStates = signal<Drawer>({});

  setDrawerOpen(id: string, isOpen: boolean) {
    this.drawerStates.update((states) => ({ ...states, [id]: isOpen }));
  }

  isDrawerOpen(id: string): boolean {
    return this.drawerStates()[id] ?? false;
  }
}
