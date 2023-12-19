import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { ShopComponent } from '../components/shop/shop.component';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from '../components/product/product.component';
import { CartService } from '../services/cart.service';
import { Cart } from '../types/types';

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
    ProductComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fed22m-exjobb-helgaborje';
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
