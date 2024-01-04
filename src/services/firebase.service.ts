// import { Injectable } from "@angular/core";
// import { Firestore, collection, collectionData, doc, getDoc } from "@angular/fire/firestore";
// import { Observable, from, map } from "rxjs";
// import { Product } from "../types/types";

// @Injectable({
//   providedIn: 'root',
// })
// export class FirebaseService {

//   constructor(private fs: Firestore) { }

//   getAllProducts(): Observable<Product[]> {
//     const productsCollection = collection(this.fs, 'products');
//     return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
//   }

//   getProduct(productId: string): Observable<Product | undefined> {
//     const productDoc = doc(this.fs, 'products', productId);
//     return from(getDoc(productDoc)).pipe(
//       map(doc => (doc.exists() ? { id: doc.id, ...doc.data() } as Product : undefined))
//     );
//   }


  // getProduct(productId: string): Observable<Product | undefined> {
  //   const productDoc = doc(this.fs, 'products', productId);
  //   return from(getDoc(productDoc)).pipe(
  //     map(doc => (doc.exists() ? doc.data() as Product : undefined))
  //   );
  // }
// }
