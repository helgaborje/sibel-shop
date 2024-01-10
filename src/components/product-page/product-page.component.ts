import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/types';
import { ProductComponent } from '../product/product.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductComponent, CommonModule, MatButtonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {
  @Input() product: Product | undefined;
  selectedSize: string = '';
  selectedColor: string = '';
  // products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private _snackBar: MatSnackBar,
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
    if (!this.selectedSize) {
      this._snackBar.open('Please select size', 'Ok', { duration: 3000 });

      return;
    }

    if (!this.selectedColor) {
      this._snackBar.open('Please select color', 'Ok', { duration: 3000 });

      return;
    }

    this.cartService.addToCart({
      product: product.image[0],
      name: product.name,
      size: this.selectedSize,
      color: this.selectedColor,
      price: product.price,
      quantity: 1,
      id: product.id ?? ''
    })
  }

  // select size
  selectSize(size: string): void {
    this.selectedSize = size;
  }

  // select color
  selectColor(color: string): void {
    this.selectedColor = color;
  }
}
