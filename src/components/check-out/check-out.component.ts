import { Component } from '@angular/core';
import { Order } from '../../types/types';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, FormsModule, CartComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {

  customerFirstName: string = '';
  customerLastName: string = '';
  customerAddress: string = '';
  customerEmail: string = '';
  customerCity: string = '';
  customerZip: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  getCartItems(): any[] {
    return this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartService.getTotal(this.getCartItems());
  }

  checkout(): void {
    const selectedProducts = this.cartService.getCartItems();
    const totalOrder = this.cartService.getTotal(selectedProducts);

    const order: Order = {
      products: selectedProducts,
      timestamp: Date.now().toLocaleString(),
      firstName: this.customerFirstName,
      lastName: this.customerLastName,
      address: [this.customerAddress, this.customerCity, this.customerZip],
      email: this.customerEmail,
      total:  totalOrder
    };

    console.log('order', order);

    this.orderService.createOrder(order).subscribe(() => {

      // this.cartService.clearCart();
    });
  }

}
