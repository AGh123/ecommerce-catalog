import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawerStates = signal<{ [id: string]: boolean }>({});

  setDrawerOpen(id: string, isOpen: boolean) {
    this.drawerStates.update((states) => ({ ...states, [id]: isOpen }));
  }

  isDrawerOpen(id: string): boolean {
    return this.drawerStates()[id] ?? false;
  }
}
