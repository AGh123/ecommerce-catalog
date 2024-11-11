import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss',
})
export class RegisterAdminComponent {
  adminForm: FormGroup;
  error = signal<string>('');

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isDisabled() {
    return !this.adminForm.valid;
  }

  onSubmit() {
    this.authService
      .register(
        this.adminForm.get('email')?.value,
        this.adminForm.get('password')?.value,
        this.adminForm.get('username')?.value
      )
      .subscribe({
        next: () => {
          this.router
            .navigateByUrl('http://localhost:4200', {
              skipLocationChange: true,
            })
            .then(() => {
              this.router.navigate(['/admin']);
            });
        },
        error: (err) => {
          this.error.set(err);
        },
      });
  }
}
