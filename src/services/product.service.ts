import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getDoc } from "@angular/fire/firestore";
import { Observable, from, map } from "rxjs";
import { Product } from "../types/types";
import { updateDoc } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private fs: Firestore) { }

  getAllProducts(): Observable<Product[]> {
    const productsCollection = collection(this.fs, 'products');
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  getProduct(productId: string): Observable<Product | undefined> {
    const productDoc = doc(this.fs, 'products', productId);
    return from(getDoc(productDoc)).pipe(
      map(doc => (doc.exists() ? { id: doc.id, ...doc.data() } as Product : undefined))
    );
  }

  deleteProduct(productId: string): Observable<void> {
    return from(deleteDoc(doc(this.fs, `products/${productId}`)));
  }

  updateProduct(product: Product): Observable<void> {
    return from(updateDoc(doc(this.fs, `products/${product.id}`), product));
  }
}
