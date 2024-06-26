import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, DocumentData, DocumentReference, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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

  getOrders(): Observable<any[]> {
    const ordersCollection = collection(this.fs, 'orders');
    return collectionData(ordersCollection, { idField: 'id' });
  }

  updateOrder(order: Order): Observable<void> {
    return from(updateDoc(doc(this.fs, `orders/${order.id}`), order));
  }

  deleteOrder(orderId: string): Observable<void> {
    return from(deleteDoc(doc(this.fs, `orders/${orderId}`)));
  }
}
