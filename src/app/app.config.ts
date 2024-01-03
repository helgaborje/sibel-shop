import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { CartService } from '../services/cart.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AuthService } from '../services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      "projectId": "sibel-shop",
      "appId": "1:899347068785:web:fb7506a9918ae3c280e8d0",
      "storageBucket": "sibel-shop.appspot.com",
      "apiKey": "AIzaSyALdpiW42KybJqN8afIrCiWijjT5x7O7U0",
      "authDomain": "sibel-shop.firebaseapp.com",
      "messagingSenderId": "899347068785"
    }))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideAnimations(),
    AuthService
]
};
