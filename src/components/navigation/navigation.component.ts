import { Component, Input, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../types/types';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CartComponent, RouterOutlet, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  private _cart: Cart = { items: [] }

  itemsQuantity = 0

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  constructor(private cartService: CartService) { }


  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

}
// cart: Cart = { items: [] };

// constructor(private cartService: CartService) {}

// ngOnInit() {
//   this.cartService.cart.subscribe((_cart) => {
//     this.cart = _cart;
//     console.log('Cart Items:', this.cart.items);
//   });



// }
