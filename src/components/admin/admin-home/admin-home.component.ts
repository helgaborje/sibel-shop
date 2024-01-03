import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Order } from '../../../types/types';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit{
  orders: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

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

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
      console.log('Orders', orders);
    });
  }

}
