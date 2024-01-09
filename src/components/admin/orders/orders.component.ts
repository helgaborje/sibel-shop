import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] =  ['position','name', 'products', 'size', 'color', 'quantity', 'total', 'check', 'delete' ];
  newOrders: any[] = [];
  handledOrders: any[] = [];

  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar
  ) { }

  private pendingOrders() {
    this.orderService.getOrders().subscribe((orders) => {
      this.newOrders = orders.filter(order => order.pending);
      this.handledOrders = orders.filter(order => !order.pending);
    });
  }

  ngOnInit() {
    this.pendingOrders();
  }

   // Set pending to false
   handleOrder(order: any) {
    order.pending = false;
    this.orderService.updateOrder(order).subscribe(() => {
      this.pendingOrders();
    });
  }

  // Set pending to true
  cancelOrder(order: any) {
    order.pending = true;
    this.orderService.updateOrder(order).subscribe(() => {
      this.pendingOrders();
    });
  }

  // Delete order
  deleteOrder(order: any) {
    const snackBarRef = this._snackBar.open('Are you sure you want to delete order?', 'Delete', { duration: 5000 });
    snackBarRef.onAction().subscribe(() => {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.pendingOrders();
    });
  });
  }
}
