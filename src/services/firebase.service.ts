import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Product } from "../types/types";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor(private fs: Firestore) { }

  // getProduct(id: string) {
  //   let product = collection(this.fs, 'products').doc(id)
  //   return this.fs.collection<Product>('products').doc(id)
  //     .valueChanges();
  // }

  getAllProducts(): Observable<Product[]> {
    const productsCollection = collection(this.fs, 'products');
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }





}
