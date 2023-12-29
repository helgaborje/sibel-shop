import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Order } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fs: Firestore) { }

  createOrder(order: Order): Observable<string> {
    const ordersCollection = collection(this.fs, 'orders');
    return from(addDoc(ordersCollection, order)).pipe(
      map((docRef: DocumentReference<DocumentData, DocumentData>) => docRef.id)
    );
  }
}
