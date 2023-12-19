import { Component, Input, OnInit } from '@angular/core';
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


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = _cart.items;
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  checkOut() {

  }
}


// import { Component, Input, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { Cart, CartItem } from '../../types/types';
// import { CartService } from '../../services/cart.service';
// import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-cart',
//   standalone: true,
//   imports: [ CommonModule, RouterModule],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.scss'
// })
// export class CartComponent implements OnInit {
//   private _cart: Cart = { items: [] }

//   itemsQuantity = 0

//   dataSource: CartItem[] = [];
//   cartSubscription: Subscription | undefined;

//   @Input()
//   get cart(): Cart {
//     return this._cart
//   }

//   set cart(cart: Cart) {
//     this._cart = cart;

//     this.itemsQuantity = cart.items
//       .map((item) => item.quantity)
//       .reduce((prev, curent) => prev + curent, 0);
//   }

//   constructor(private cartService: CartService) { }


//   getTotal(items: CartItem[]): number {
//     return this.cartService.getTotal(items);
//   }

//   ngOnInit(): void {
//     this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
//       this.cart = _cart;
//       this.dataSource = _cart.items;
//     });
//   }

//   checkOut() {

//   }
// }
