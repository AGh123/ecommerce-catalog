import { Component, input, output } from '@angular/core';
import { ListProducts } from '../products.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

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

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private router: Router
  ) {}

  openDeleteDialog(product: ListProducts) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30rem',
      data: {
        dialogTitle: 'Delete Item',
        dialogContent: 'Are you sure you want to delete ' + product.title + '?',
        answerOne: 'No',
        answerTwo: 'Yes',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService.deleteProduct(product.id).subscribe(() => {
          this.router
            .navigateByUrl('http://localhost:4200', {
              skipLocationChange: true,
            })
            .then(() => {
              this.router.navigate(['/catalog']);
            });
        });
      }
    });
  }

  sliceTitle(title: string) {
    return title.slice(0, 16);
  }

  editProduct(product: ListProducts) {
    this.editProductClicked.emit(product);
  }
}
