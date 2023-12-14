import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from '../../types/types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient, private fb: FirebaseService) {}

ngOnInit(): void {
  this.fb.getAllProducts().subscribe((products: Product[]) => {
    console.log(products);
    this.products = products;
  });
}

}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Product } from '../../types/types';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-shop',
//   standalone: true,
//   imports: [HttpClientModule, CommonModule, RouterModule],
//   templateUrl: './shop.component.html',
//   styleUrl: './shop.component.scss'
// })
// export class ShopComponent implements OnInit {
//   products: Product[] = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.http.get<{ products:Product[]}>('./assets/products.json').subscribe(response => {
//       console.log(response)
//       this.products = response.products;
//     });
//   }
// }

// shop.component.ts
// import { Component, OnInit } from '@angular/core';

// import { Product } from '../../types/types';
// import { ProductService } from '../../services/product.service';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-shop',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   styleUrls: ['./shop.component.scss'],
//   templateUrl: './shop.component.html',
// })
// export class ShopComponent implements OnInit {
//   products: Product[] = [];

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe((response) => {
//       console.log('Fetched products:', response);
//       this.products = response;
//       this.productService.setProducts(response);
//     });
//   }
// }
