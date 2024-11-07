import { Component, input, output, signal } from '@angular/core';
import { ListProducts } from '../products.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<ListProducts>();
  editProductClicked = output<ListProducts>();

  sliceTitle(title: string) {
    return title.slice(0, 16);
  }

  editProduct(product: ListProducts) {
    this.editProductClicked.emit(product);
  }
}
