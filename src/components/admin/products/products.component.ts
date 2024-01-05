import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, FormsModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] =  ['position','name', 'description', 'image', 'price', 'edit', 'delete' ];
  // products: any[] = [];
  products: Product[] = [];
  addingNewProduct: boolean = false;
  newProduct: Product = {
    name: '',
    description: '',
    image: '',
    price: 0,
    editProduct: true
  }

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
      // this.products = products;
      this.products = products.map(product => ({ ...product, editProduct: false }));
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

  // Toggle edit mode
  toggleEdit(product: any) {
    product.editProduct = !product.editProduct;
  }

  // Save product changes
  saveChanges(product: any) {
    this.productService.updateProduct(product).subscribe(() => {
      this.getProducts();
    });
    product.editProduct = false;
  }

  // Add new product
  addProduct() {
    this.addingNewProduct = !this.addingNewProduct;
    if (!this.addingNewProduct) {
      this.newProduct = { name: '', description: '', image: '', price: 0, editProduct: false };
    }
  }

  // Save new product
  saveNewProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.getProducts();
      this.addProduct();
    });
  }
  }



