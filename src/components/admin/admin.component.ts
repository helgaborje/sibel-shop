import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  login() {
    this.authService.signInWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      console.log('Signed in works!', userCredential);
      this.router.navigate([AuthService.redirectUrl]);
    })
    .catch((error) => {
      this._snackBar.open('Can´t sig in', 'Ok', { duration: 3000 });
    });
  }
}
