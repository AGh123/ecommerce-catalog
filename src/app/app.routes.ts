import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'catalog', component: CatalogComponent, title: 'Catalog' },
  { path: 'about', component: AboutComponent, title: 'About' },
];
