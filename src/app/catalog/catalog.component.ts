import { Component, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { ProductsService } from '../products/products.service';
import { ListProducts } from '../products/products.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { Drawers } from '../shared/models/drawer.enum';
import { DrawerService } from '../shared/services/drawer.service';
import { EditProductComponent } from '../products/edit-product/edit-product.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    ProductCardComponent,
    MatProgressSpinnerModule,
    DrawerComponent,
    EditProductComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  products = signal<ListProducts[]>([]);
  isSpinner = signal(false);
  productToBeUpdated = signal<ListProducts | undefined>(undefined);
  drawers = signal(Drawers);

  constructor(
    private productsService: ProductsService,
    private drawerService: DrawerService
  ) {}

  ngOnInit(): void {
    this.isSpinner.set(true);
    this.productsService
      .getAllProducts()
      .subscribe((products: ListProducts[]) => {
        this.products.set(products);
        this.isSpinner.set(false);
      });
  }

  openEditProductDrawer(product: ListProducts) {
    this.productToBeUpdated.set(product);
    this.drawerService.setDrawerOpen(Drawers.EditProductDrawer, true);
  }

  isEditProductDrawerOpen() {
    return this.drawerService.isDrawerOpen(Drawers.EditProductDrawer);
  }
}
