import { Component, input, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DrawerService } from '../../shared/services/drawer.service';
import { ProductsService } from '../products.service';
import { UpdateProduct } from '../products.interface';
import { Drawers } from '../../shared/models/drawer.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  isSpinner = signal(false);
  productToBeUpdated = input.required<UpdateProduct | undefined>();

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private drawerService: DrawerService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [this.productToBeUpdated()?.title, Validators.required],
      price: [
        this.productToBeUpdated()?.price,
        [Validators.required, Validators.min(0)],
      ],
      category: [this.productToBeUpdated()?.category, Validators.required],
      description: [this.productToBeUpdated()?.description],
      image: [this.productToBeUpdated()?.image, Validators.required],
    });
  }

  onSubmit() {
    if (!this.isDisabled()) {
      this.isSpinner.set(true);
      let product: UpdateProduct = {
        id: this.productToBeUpdated()?.id,
        title: this.productForm.get('title')?.value,
        price: this.productForm.get('price')?.value,
        category: this.productForm.get('category')?.value,
        description: this.productForm.get('description')?.value,
        image: this.productForm.get('image')?.value,
      };

      this.productsService.updateProduct(product).subscribe(() => {
        this.drawerService.setDrawerOpen(Drawers.EditProductDrawer, false);
        this.isSpinner.set(false);
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  isDisabled() {
    return !this.productForm.valid || !this.productForm.dirty;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
    this.productForm.markAsDirty();
  }
}
