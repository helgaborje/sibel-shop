import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../types/types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({ items: [] });
  private itemCountSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  itemCount$ = this.itemCountSubject.asObservable();

  // cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cartSubject.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cartSubject.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value.items;
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  updateItemQuantity(item: CartItem, quantity: number): void {
    const items = [...this.cartSubject.value.items];
    const itemIndex = items.findIndex((_item) => _item.id === item.id);

    if (itemIndex !== -1) {
      items[itemIndex].quantity += quantity;
    } else {
      items.push({ ...item, quantity });
    }

    this.cartSubject.next({ items });

    const totalCount = items.reduce((prev, current) => prev + current.quantity, 0);
    this.itemCountSubject.next(totalCount);
  }


  clearCart(): void {
    this.cartSubject.next({ items: [] });
    this.itemCountSubject.next(0);
  }
}
