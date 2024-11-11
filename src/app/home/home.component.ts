import { Component, OnInit, signal } from '@angular/core';
import { ListProducts } from '../products/products.interface';
import { ProductsService } from '../products/products.service';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from '../shared/components/button/button.component';
import { Router } from '@angular/router';
import { Drawers } from '../shared/models/drawer.enum';
import { DrawerService } from '../shared/services/drawer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, MatProgressSpinnerModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products = signal<ListProducts[]>([]);
  isSpinner = signal(false);
  drawers = signal(Drawers);

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private drawerService: DrawerService
  ) {}

  ngOnInit(): void {
    this.isSpinner.set(true);
    this.productsService
      .getLimitedProducts(4)
      .subscribe((products: ListProducts[]) => {
        this.products.set(products);
        this.isSpinner.set(false);
      });
  }

  navigateToCatalog() {
    this.router.navigate(['catalog']);
  }
}
