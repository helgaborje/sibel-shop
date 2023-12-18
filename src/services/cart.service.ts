import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../types/types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })


  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    // Check if item is already in cart
    const itemsInCart = items.find((_item) => _item.id === item.id)
    if (itemsInCart) {
      itemsInCart.quantity += 1
    } else {
      items.push(item)
    }

    this.cart.next({ items })
    this._snackBar.open('Added to cart', 'Ok', {
      duration: 3000
    })
    console.log('Added to cart',this.cart.value)
  }
}
