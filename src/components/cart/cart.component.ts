import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart, CartItem } from '../../types/types';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
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
  checkOut() {

  }
}
