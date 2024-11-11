import { Component, input, output } from '@angular/core';
import { GetProductInterface } from '../../shared/models/products.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CartService } from '../../shared/services/cart.service';
import { DrawersEnum } from '../../shared/models/drawer.enum';
import { DrawerService } from '../../shared/services/drawer.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<GetProductInterface>();
  editProductClicked = output<GetProductInterface>();

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private router: Router,
    public authService: AuthService,
    private cartService: CartService,
    private drawerService: DrawerService
  ) {}

  openDeleteDialog(product: GetProductInterface) {
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
    return title.slice(0, 12);
  }

  editProduct(product: GetProductInterface) {
    this.editProductClicked.emit(product);
  }

  addToCart(product: GetProductInterface) {
    this.cartService.addToCart(product);
    this.drawerService.setDrawerStatus(DrawersEnum.CartDrawer, true);
  }
}
