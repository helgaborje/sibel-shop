import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, FormsModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit {
  displayedColumns: string[] =  ['position','name', 'description', 'image', 'price', 'edit', 'delete' ];
  products: Product[] = [];
  addingNewProduct: boolean = false;
  newProduct: Product = {
    name: '',
    description: '',
    image: [],
    price: 0,
    editProduct: true
  }

  selectedFiles: FileList | null = null;

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
  ) { }


  ngOnInit() {
    this.getProducts();
  }

  // get all products
  private getProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products.map(product => ({ ...product, editProduct: false }));
    });
  }

  // delete product
  deleteProduct(product: any) {
    const snackBarRef = this._snackBar.open('Are you sure you want to delete product?', 'Delete', { duration: 5000 });
    snackBarRef.onAction().subscribe(() => {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.getProducts();
    });
  });
  }

  // toggle edit mode
  toggleEdit(product: any) {
    product.editProduct = !product.editProduct;
  }

  // aave product changes
  saveChanges(product: any) {
    this.productService.updateProduct(product).subscribe(() => {
      this.getProducts();
    });
    product.editProduct = false;
  }

  // add new product
  addProduct() {
    this.addingNewProduct = !this.addingNewProduct;
    if (!this.addingNewProduct) {
      this.newProduct = { name: '', description: '', image: [], price: 0, editProduct: false };
    }
  }

// upload multiple images to Firebase Storage
uploadImages(product?: Product): void {
  const storage = getStorage();
  const uploadTasks: Promise<void>[] = [];

  const targetProduct = product || this.newProduct;
    targetProduct.image = targetProduct.image || [];

  const isNewProduct = !product;

  if (isNewProduct) {
    product = this.newProduct;
  }

  product!.image = product!.image || [];

  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const selectedFile = this.selectedFiles[i];
      const path = `images/${new Date().getTime()}_${selectedFile.name}`;
      const storageRef = ref(storage, path);
      const task = uploadBytes(storageRef, selectedFile);

      const uploadTaskPromise = new Promise<void>((resolve, reject) => {
        task
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then((downloadURL) => {
                isNewProduct ? this.newProduct!.image!.push(downloadURL) : product!.image!.push(downloadURL);
                resolve();
              })
              .catch((error) => reject(error));
          })
          .catch((error) => reject(error));
      });

      uploadTasks.push(uploadTaskPromise);
    }

    Promise.all(uploadTasks)
      .then(() => {
        this._snackBar.open('All images are uploaded', 'Ok', { duration: 3000 });
      })
      .catch((error) => {
        this._snackBar.open(error, 'Ok', { duration: 3000 });
      });
  }
}

 // delete image in edit mode
deleteImage(element: Product, imageToDelete: string): void {
  const snackBarRef = this._snackBar.open('Are you sure you want to delete the image?', 'Yes', {
    duration: 5000,
  });

  snackBarRef.onAction().subscribe(() => {
    element.image = element.image.filter((image: string) => image !== imageToDelete);
  });
}

  // save new product
  saveNewProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.getProducts();
      this.addProduct();
    });
  }
}
