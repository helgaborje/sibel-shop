import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/types';
import { ProductComponent } from '../product/product.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {
  @Input() product: Product | undefined;
  // products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
    ) { }


    ngOnInit(): void {
      let productId = this.route.snapshot.paramMap.get('id')!;
      console.log('productId', productId)

    productId && this.productService.getProduct(productId).subscribe((response) => {
      console.log('response', response)
      this.product = response;

    });
  }

  onAddToCart(product: Product): void {
    console.log('product from product-page', product)
    this.cartService.addToCart({
      product: product.image,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id ?? ''
    })
  }
}

  // onAddToCart(productId: string): void {
  //   const product = this.products.find((p) => p.id === productId);
  //   if (product) {
  //     this.cartService.addToCart({
  //       product: product.image,
  //       image: product.image,
  //       name: product.name,
  //       price: product.price,
  //       quantity: 1,
  //       id: product.id
  //     });
  //   }
  // }




