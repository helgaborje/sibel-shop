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
//   product: Product | undefined;

//   constructor(private route: ActivatedRoute, private productService: ProductService) { }

//   ngOnInit(): void {
//     let productId = this.route.snapshot.paramMap.get('id')!;
//     console.log('productId', productId)

//     productId && this.productService.getProduct(productId).subscribe((response) => {
//       console.log('response', response)
//       this.product = response;

//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/types';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: FirebaseService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')!;
    console.log('productId', productId)

    productId && this.productService.getProduct(productId).subscribe((response) => {
      console.log('response', response)
      this.product = response;

    });
  }
}
