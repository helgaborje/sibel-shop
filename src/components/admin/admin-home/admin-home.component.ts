import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit{
  displayedColumns: string[] =  ['position','name', 'products', 'total', 'check' ];
  newOrders: any[] = [];
  handledOrders: any[] = [];


  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
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

  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/admin']);
      })
      .catch((error) => {
        console.error('Logout error', error);
      });
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

}
