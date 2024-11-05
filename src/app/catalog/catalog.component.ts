import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { ProductsService } from '../products/products.service';
import { ListProducts } from '../products/products.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, MatProgressSpinnerModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent {
  products = signal<ListProducts[]>([]);
  isSpinner = signal(false);
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.isSpinner.set(true);
    this.productsService
      .getAllProducts()
      .subscribe((products: ListProducts[]) => {
        this.products.set(products);
        this.isSpinner.set(false);
      });
  }
}
