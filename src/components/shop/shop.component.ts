import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  // Get all products from firebase
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image[0],
      name: product.name,
      size: product.size,
      color: product['color'],
      price: product.price,
      quantity: 1,
      id: product.id ?? ''
    })
  }
}
