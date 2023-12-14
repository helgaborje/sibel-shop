import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/types';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  // product: Product = { id: '' };

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')!;
    console.log('productId', productId)

    productId && this.productService.getProduct(productId).subscribe((response) => {
      console.log('response', response)
      // this.product = response;
    });
  }
}

// // product.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// import { Product } from '../../types/types';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   styleUrls: ['./product.component.scss'],
//   templateUrl: './product.component.html',
// })
// export class ProductComponent implements OnInit {
//   product: Product = { id: '' };
//   loading = false;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.loading = true;
//     const id = this.route.snapshot.paramMap.get('id') ?? '';
//     const foundProduct = this.productService.getProductById(id);

//     if (foundProduct) {
//       this.product = foundProduct;
//       console.log('foundProduct', foundProduct)
//     } else {
//       console.error('Product not found');
//     }

//     this.loading = false;
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Product } from '../../types/types';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss']
// })
// export class ProductComponent implements OnInit {
//   product: Product = { id: '', name: '', description: '', price: 0 };
//   loading = false;

//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

//   ngOnInit(): void {
//     this.loading = true;
//     const id = this.route.snapshot.paramMap.get('id');
//     const url = './assets/products.json';

//     this.http.get<Product[]>(url).toPromise().then((data) => {
//       // Assuming your JSON is an array of products
//       const foundProduct = data!.find(product => product.id === id);

//       if (foundProduct) {
//         this.product = foundProduct;
//       } else {
//         console.error('Product not found');
//       }

//       this.loading = false;
//     }).catch(() => {
//       console.error('Error occurred while fetching product details');
//       this.loading = false;
//     });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Product } from '../../types/types';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.scss'
// })
// export class ProductComponent implements OnInit {
//   product: Product = { id: '' };
//   loading = false;

//   constructor(private route: ActivatedRoute, private http: HttpClient) { }

//   ngOnInit(): void {
//     this.loading = true;
//     const id = this.route.snapshot.paramMap.get('id');
//     const url = './assets/products.json';
//     this.http.get(`${url}`).pipe(map((response: any) => response as Product)).toPromise().then((data) => {
//       this.product = data!;
//       this.loading = false;
//     }).catch(() => {
//       console.error('Error occurred while fetching product details');
//       this.loading = false;
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../types/types';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../services/product.service';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.scss'
// })
// export class ProductComponent implements OnInit {
//   product: Product = { id: '', name: '', description: '', price: 0 }; // Initialize other properties

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService // Inject your product service
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const productId = params.get('id')!; // Convert productId to a number
//       this.getProductDetails(productId);
//     });
//   }

//   private getProductDetails(productId: string): void { // Update the parameter type to number
//     // Assuming you have a getProductById method in your ProductService
//     this.productService.getProductById(productId).subscribe(
//       (product: Product) => {
//         this.product = product;
//       },
//     );
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../types/types';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.scss'
// })
// export class ProductComponent implements OnInit {
//   product: Product = { id: '' };

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.product.id = params.get('id')!;
//     });
//   }
// }

// product.component.ts

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../types/types';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../services/product.service';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss']
// })
// export class ProductComponent implements OnInit {
//   product: Product = { id: '' };

//   constructor(private route: ActivatedRoute, private productService: ProductService) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       const productId = params['id'];

//       // Fetch product details using ProductService
//       this.productService.getProductById(productId).subscribe(
//         (data) => {
//           this.product = data;
//         },
//         (error) => {
//           console.error('Error fetching product details:', error);
//         }
//       );
//     });
//   }
// }

