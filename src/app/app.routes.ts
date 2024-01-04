import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShopComponent } from '../components/shop/shop.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { CheckOutComponent } from '../components/check-out/check-out.component';
import { ProductPageComponent } from '../components/product-page/product-page.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AdminHomeComponent } from '../components/admin/admin-home/admin-home.component';
import { AuthGuard } from './guard/auth.guard';
import { AboutComponent } from '../components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ShopComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: '**', component: PageNotFoundComponent }
];


