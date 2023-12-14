import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { ShopComponent } from '../components/shop/shop.component';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CartComponent,
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    ShopComponent,
    HomeComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fed22m-exjobb-helgaborje';
}
