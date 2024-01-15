import { Component, Input } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, CartComponent, RouterOutlet, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input() cart: Cart = { items: [] };

  constructor(private cartService: CartService) { }
  get itemsQuantity(): number {
    return this.cartService.getCartItems().length;
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }
}
