import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cart, CartItem } from '../../types/types';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [] };
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;
  item: CartItem | undefined;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe((cart: Cart) => {
      this.cart = cart;
      this.dataSource = cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  getProductTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  checkOut() {

  }

  // increase quantity
  increaseQuantity(item: CartItem) {
    this.cartService.updateItemQuantity(item, 1);

  }
  // decrease quantity
  decreaseQuantity(item: CartItem) {
    this.cartService.updateItemQuantity(item, -1);
  }

  // delete item from cart
  deleteItem(item: CartItem) {
    this.cartService.deleteItem(item);

  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
