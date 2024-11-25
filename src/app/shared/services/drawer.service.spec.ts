import { TestBed } from '@angular/core/testing';
import { DrawerService } from './drawer.service';
import { DrawersEnum } from '../models/drawer.enum';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawerService],
    });
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the drawer state to open', () => {
    const drawerId = DrawersEnum.AddProductDrawer;
    service.setDrawerStatus(drawerId, true);

    expect(service.isDrawerOpen(drawerId)).toBe(true);
  });

  it('should set the drawer state to closed', () => {
    const drawerId = DrawersEnum.AddProductDrawer;
    service.setDrawerStatus(drawerId, true);
    service.setDrawerStatus(drawerId, false);

    expect(service.isDrawerOpen(drawerId)).toBe(false);
  });

  it('should maintain states of multiple drawers independently', () => {
    const drawerId1 = DrawersEnum.AddProductDrawer;
    const drawerId2 = DrawersEnum.CartDrawer;

    service.setDrawerStatus(drawerId1, true);
    service.setDrawerStatus(drawerId2, false);

    expect(service.isDrawerOpen(drawerId1)).toBe(true);
    expect(service.isDrawerOpen(drawerId2)).toBe(false);
  });
});
