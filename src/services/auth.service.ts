import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  static redirectUrl: string = '/admin-home';

  constructor(private auth: Auth ) {
    console.log('Hello AuthService Provider');
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

}
