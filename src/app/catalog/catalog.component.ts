import { Component, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { ProductsService } from '../shared/services/products.service';
import { GetProductInterface } from '../shared/models/products.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DrawerComponent } from '../shared/components/drawer/drawer.component';
import { DrawersEnum } from '../shared/models/drawer.enum';
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
  products = signal<GetProductInterface[]>([]);
  isSpinner = signal(false);
  productToBeUpdated = signal<GetProductInterface | undefined>(undefined);
  drawers = signal(DrawersEnum);

  constructor(
    private productsService: ProductsService,
    private drawerService: DrawerService
  ) {}

  ngOnInit(): void {
    this.isSpinner.set(true);
    this.productsService
      .getAllProducts()
      .subscribe((products: GetProductInterface[]) => {
        this.products.set(products);
        this.isSpinner.set(false);
      });
  }

  openEditProductDrawer(product: GetProductInterface) {
    this.productToBeUpdated.set(product);
    this.drawerService.setDrawerStatus(DrawersEnum.EditProductDrawer, true);
  }

  isEditProductDrawerOpen() {
    return this.drawerService.isDrawerOpen(DrawersEnum.EditProductDrawer);
  }
}
