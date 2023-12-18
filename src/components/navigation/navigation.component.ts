import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../types/types';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CartComponent, RouterOutlet, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      console.log('Cart Items:', this.cart.items);
    });



  }

}
