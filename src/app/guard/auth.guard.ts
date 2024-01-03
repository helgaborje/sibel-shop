import { CanActivateFn, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (): Observable<boolean | UrlTree> => {
    return this.authService.user$.pipe(
      take(1),
      map((user) => {
        if (user && user.email === 'helgaborjesson@gmail.com') {
          return true;
        } else {
          this.router.navigate(['/admin']);
          return false
        }
      })
    );
  };
}
