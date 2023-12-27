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
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  getCartItems(): CartItem[] {
    return this.cart.value.items;
  }
  // addToCart(item: CartItem): void {
  //   console.log('addToCart method called in CartService');
  //   const items = [...this.cart.value.items]

  //   // Check if item is already in cart
  //   const itemsInCart = items.find((_item) => _item.id === item.id)
  //   console.log('itemsInCart', itemsInCart)
  //   if (itemsInCart) {
  //     itemsInCart.quantity += 1
  //     console.log('Item quantity incremented:', item);
  //   } else {
  //     items.push(item)
  //     console.log('Item added to cart:', item);
  //   }

  //   this.cart.next({ items })
  //   this._snackBar.open('Added to cart', 'Ok', {
  //     duration: 3000
  //   })
  //   console.log('Cart updated:', this.cart.value);
  // }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
}
