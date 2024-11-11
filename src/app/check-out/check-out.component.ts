import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CartService } from '../cart/service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    CommonModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {
    this.clientForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      address: ['', Validators.required],
    });
  }

  get cartProducts() {
    return this.cartService.getCartProducts();
  }

  isDisabled() {
    return !this.clientForm.valid || this.cartProducts.length === 0;
  }
  getTotalPrice() {
    let sum = 0;
    this.cartProducts.forEach((product) => (sum += product.price));
    return sum;
  }

  onSubmit() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
