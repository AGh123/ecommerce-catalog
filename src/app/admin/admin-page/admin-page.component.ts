import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { RegisterAdminComponent } from '../register-admin/register-admin.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    MatTabsModule,
    ButtonComponent,
    AvatarComponent,
    RegisterAdminComponent,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
