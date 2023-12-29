import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Order } from '../../types/types';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmationModalComponent } from '../order-confirmation-modal/order-confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  orderSuccess = false;
  orderError = false;


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) { }

  getCartItems(): any[] {
    return this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartService.getTotal(this.getCartItems());
  }

  checkout(): void {

    if (!this.customerFirstName || !this.customerLastName || !this.customerAddress || !this.customerCity || !this.customerZip || !this.customerEmail) {
      this._snackBar.open('Please fill in all required fields before placing the order', 'Ok', { duration: 3000 });
      return;
    }

    const selectedProducts = this.cartService.getCartItems();
    const totalOrder = this.cartService.getTotal(selectedProducts);

  if (totalOrder <= 0) {
    this._snackBar.open('You need to add something to cart', 'Ok', { duration: 3000 });
    return;
  }

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

    this.orderService.createOrder(order).subscribe((orderId) => {
      this.openOrderConfirmationModal(orderId);
      console.log('Order created with ID:', orderId);

      // Clear cart
      this.cartService.clearCart();
    });
  }

  openOrderConfirmationModal(orderId: string): void {
    const modalRef = this.modalService.open(OrderConfirmationModalComponent);
    modalRef.componentInstance.orderId = orderId;
  }

}
