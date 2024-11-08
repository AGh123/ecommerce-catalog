import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsService } from '../products.service';
import { AddProduct } from '../products.interface';
import { DrawerService } from '../../shared/services/drawer.service';
import { Drawers } from '../../shared/models/drawer.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm: FormGroup;
  isSpinner = signal(false);

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private drawerService: DrawerService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: [''],
      image: [null, Validators.required],
    });
  }

  onSubmit() {
    if (!this.isDisabled()) {
      this.isSpinner.set(true);
      let product: AddProduct = {
        title: this.productForm.get('title')?.value,
        price: this.productForm.get('price')?.value,
        category: this.productForm.get('category')?.value,
        description: this.productForm.get('description')?.value,
        image: this.productForm.get('image')?.value,
      };

      this.productsService.addProduct(product).subscribe(() => {
        this.drawerService.setDrawerOpen(Drawers.AddProductDrawer, false);
        this.isSpinner.set(false);
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  isDisabled() {
    return !this.productForm.valid;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }
}
