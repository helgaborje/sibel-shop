import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { ShopComponent } from '../components/shop/shop.component';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartComponent, CommonModule, RouterOutlet, NavigationComponent, ShopComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fed22m-exjobb-helgaborje';
}
