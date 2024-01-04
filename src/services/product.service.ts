// import { Injectable } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   public url = './assets/products.json';

//   constructor(private http: HttpClient) {}

//   getProductById(productId: string): Observable<any> {
//     const url = `${this.url}/product/${productId}`;
//     console.log('url', url)
//     return this.http.get(url);
//   }
// }


import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, getDoc } from "@angular/fire/firestore";
import { Observable, from, map } from "rxjs";
import { Product } from "../types/types";


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


  // constructor(private http: HttpClient) {}

  // getProduct(id: string) {
  //   return this.http.get<Product>(`./assets/products.json`).pipe(
  //     map((response: any) => response.products.find((product: Product) => product.id.toString() === id))
  //   );
  // }

  // getProducts() {
  //   return this.http.get<Product[]>(`./assets/products.json`).pipe(
  //     map((response: any) => response.products)
  //     );
  // }

  // deleteProduct(id: string) {
  //   return this.http.delete(`./assets/products.json/${id}`);
  // }


}
