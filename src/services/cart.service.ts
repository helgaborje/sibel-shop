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
  private cartKey = 'cart';

  cart$ = this.cartSubject.asObservable();
  itemCount$ = this.itemCountSubject.asObservable();


  constructor(private _snackBar: MatSnackBar) {
    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  private updateLocalStorage(cart: Cart): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addToCart(item: CartItem): void {
    const items = [...this.cartSubject.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    const updatedCart = { items };
    this.cartSubject.next(updatedCart);
    this.updateLocalStorage(updatedCart);
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

  // update item quantity
  updateItemQuantity(item: CartItem, quantity: number): void {
    const items = [...this.cartSubject.value.items];
    const itemIndex = items.findIndex((_item) => _item.id === item.id);

    if (itemIndex !== -1) {
      items[itemIndex].quantity += quantity;
    } else {
      items.push({ ...item, quantity });
    }

    const updatedCart = { items };
    this.cartSubject.next(updatedCart);
    this.updateLocalStorage(updatedCart);

    const totalCount = items.reduce((prev, current) => prev + current.quantity, 0);
    this.itemCountSubject.next(totalCount);
  }

  // clear cart
  clearCart(): void {
    const updatedCart = { items: [] };
    this.cartSubject.next(updatedCart);
    this.updateLocalStorage(updatedCart);
    this.itemCountSubject.next(0);
  }

  // delete item from cart
  deleteItem(item: CartItem) {
    this.updateItemQuantity(item, -item.quantity);
    console.log(item, "deleted from cart");

    // remove item from cart
    const items = this.cartSubject.value.items.slice();
    const index = items.findIndex((_item) => _item.id === item.id);
    if (index !== -1) {
      items.splice(index, 1);
    }

    // update cart
    const updatedCart = { items };
    this.cartSubject.next(updatedCart);
    this.updateLocalStorage(updatedCart);
  }
}
