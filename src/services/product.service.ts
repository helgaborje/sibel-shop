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
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/types';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private products: Product[] = [];

  constructor(private http: HttpClient) {}


  getProduct(id: string){
    return this.http.get<Product>(`./assets/products.json/products/${id}`);
  }


}
// setProducts(products: Product[]): void {
  //   this.products = products;
  // }
// getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('./assets/products.json');
  // }
