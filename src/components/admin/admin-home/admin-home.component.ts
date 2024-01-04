import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { OrdersComponent } from '../orders/orders.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [OrdersComponent, MatTabsModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent{

  constructor(
    private authService: AuthService,
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



}
