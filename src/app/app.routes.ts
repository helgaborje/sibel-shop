import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShopComponent } from '../components/shop/shop.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'shop', component: ShopComponent },
  {path: '**', component: PageNotFoundComponent}
];


