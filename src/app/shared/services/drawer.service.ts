import { Injectable, signal } from '@angular/core';
import { DrawersInterface } from '../models/drawer.interface';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerStates = signal<DrawersInterface>({});

  setDrawerStatus(id: string, isOpen: boolean) {
    this.drawerStates.update((states) => ({ ...states, [id]: isOpen }));
  }

  isDrawerOpen(id: string): boolean {
    return this.drawerStates()[id] ?? false;
  }
}
