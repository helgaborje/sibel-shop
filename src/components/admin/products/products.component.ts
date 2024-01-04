import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] =  ['position','name', 'description', 'image', 'price', 'edit', 'delete' ];
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    this.getProducts();
  }

  // Get all products
  private getProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  // Delete product
  deleteProduct(product: any) {
    const snackBarRef = this._snackBar.open('Are you sure you want to delete product?', 'Delete', { duration: 5000 });
    snackBarRef.onAction().subscribe(() => {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.getProducts();
    });
  });
  }
}
