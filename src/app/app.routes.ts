import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShopComponent } from '../components/shop/shop.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ProductComponent } from '../components/product/product.component';
import { CheckOutComponent } from '../components/check-out/check-out.component';
import { ProductPageComponent } from '../components/product-page/product-page.component';
import { AdminComponent } from '../components/admin/admin.component';

export const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ShopComponent},
  { path: 'product/:id', component: ProductPageComponent },
  {path: 'checkout', component: CheckOutComponent},
  {path: '**', component: PageNotFoundComponent}
];


