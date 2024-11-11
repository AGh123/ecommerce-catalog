import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { CheckOutComponent } from './check-out/check-out.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'catalog', component: CatalogComponent, title: 'Catalog' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'admin', component: AdminLoginComponent, title: 'Admin Login' },
  { path: 'checkout', component: CheckOutComponent, title: 'Check Out' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
