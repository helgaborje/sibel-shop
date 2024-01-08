import { Component, OnInit} from '@angular/core';
import { CartItem, Order } from '../../types/types';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmationModalComponent } from '../order-confirmation-modal/order-confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, FormsModule, CartComponent, MatTableModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  displayedColumns: string[] = ['product','price', 'quantity', 'total', 'delete'];
  cartItems: CartItem[] = [];
  dataSource: CartItem[] = [];


  customerFirstName: string = '';
  customerLastName: string = '';
  customerAddress: string = '';
  customerEmail: string = '';
  customerCity: string = '';
  customerZip: string = '';

  orderSuccess = false;
  orderError = false;

  ngOnInit(): void {
    // Initialize cartItems in ngOnInit
    this.cartItems = this.cartService.getCartItems();
  }

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) { }

  getCartItems(): any[] {
    this.cartItems = this.cartService.getCartItems();
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
      total: totalOrder,
      pending: true
    };

    console.log('order', order);

    this.orderService.createOrder(order).subscribe((orderId) => {
      // Clear the input fields
      this.customerFirstName = '';
      this.customerLastName = '';
      this.customerAddress = '';
      this.customerEmail = '';
      this.customerCity = '';
      this.customerZip = '';

      this.openOrderConfirmationModal(orderId);
      console.log('Order created with ID:', orderId);

      // Clear cart
      this.cartService.clearCart();

      this.cartItems = this.cartService.getCartItems();
      console.log('cartItems', this.cartItems);
    });
  }


  // increase quantity
  increaseQuantity(item: CartItem) {
    this.cartService.updateItemQuantity(item, 1);

  }
  // decrease quantity
  decreaseQuantity(item: CartItem) {
    this.cartService.updateItemQuantity(item, -1);
  }

  getProductTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  // delete item from cart
  deleteItem(item: CartItem) {
    this.cartService.updateItemQuantity(item, -item.quantity);
    // remove item from cart
    const index = this.cartItems.findIndex((_item) => _item.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }

    // clear cart
    this.cartService.clearCart();

    // update cartItems array
    this.cartItems = this.cartService.getCartItems();
  }

  openOrderConfirmationModal(orderId: string): void {
    const modalRef = this.modalService.open(OrderConfirmationModalComponent);
    modalRef.componentInstance.orderId = orderId;
  }

}
