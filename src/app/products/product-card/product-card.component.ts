import { Component, input, output } from '@angular/core';
import { ListProducts } from '../products.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { AuthService } from '../../admin/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { CartService } from '../../cart/service/cart.service';
import { Drawers } from '../../shared/models/drawer.enum';
import { DrawerService } from '../../shared/services/drawer.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ButtonComponent, IconComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<ListProducts>();
  editProductClicked = output<ListProducts>();

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private router: Router,
    public authService: AuthService,
    private cartService: CartService,
    private drawerService: DrawerService
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
    return title.slice(0, 12);
  }

  editProduct(product: ListProducts) {
    this.editProductClicked.emit(product);
  }

  addToCart(product: ListProducts) {
    this.cartService.addToCart(product);
    this.drawerService.setDrawerOpen(Drawers.CartDrawer, true);
  }
}
