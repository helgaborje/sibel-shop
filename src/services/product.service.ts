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

// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../types/types';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProduct(id: string) {
    return this.http.get<Product>(`./assets/products.json`).pipe(
      map((response: any) => response.products.find((product: Product) => product.id.toString() === id))
    );
  }
}
