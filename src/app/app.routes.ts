import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShopComponent } from '../components/shop/shop.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ProductComponent } from '../components/product/product.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ShopComponent},
  {path: 'products/:id', component: ProductComponent},
  {path: '**', component: PageNotFoundComponent}
];


