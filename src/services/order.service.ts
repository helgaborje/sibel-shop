import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Order } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private fs: Firestore) { }

  createOrder(order: Order): Observable<DocumentReference<DocumentData, DocumentData>> {
    const ordersCollection = collection(this.fs, 'orders');
    return from(addDoc(ordersCollection, order));
  }
}
