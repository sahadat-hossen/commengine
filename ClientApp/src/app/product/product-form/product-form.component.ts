import { Component, OnInit } from '@angular/core';
import { SaveProduct, Product } from '../shared/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValuePair } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: SaveProduct;
  productForm : FormGroup;
  categories : KeyValuePair[];
  constructor(private productService : ProductService, private router: Router, private activatedRoute: ActivatedRoute,private formBuilder : FormBuilder) { 

    this.product = new SaveProduct();
    this.initProduct();
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(result=>{
        this.categories = result as KeyValuePair[];
    });
    this.activatedRoute.params.subscribe(
      params => {
          const id = params["id"];
          if (id) {
              this.productService
                  .getProduct(parseInt(id))
                  .subscribe(res => {
                      if (res) {
                          let _product= res as Product;
                          this.product.productName = _product.productName;
                          this.product.id = _product.id;
                          this.product.categoryId = _product.category.id;
                          this.initProduct();
                      }
                  });
          } else {
              this.product = new SaveProduct();
              this.initProduct();
          }
      }
    )
  }
  initProduct() {
    this.productForm = this.formBuilder.group({
        productName :[this.product.productName,Validators.required],
        categoryId : [this.product.categoryId,Validators.required]
    });
  }
  onSubmit(){
        const editProduct = this.prepareProduct();

        if (editProduct.id) {
            this.updateProduct(editProduct);
        } else {
            this.createProduct(editProduct);
        }
  }
  updateProduct(editProduct: SaveProduct) {
    this.productService.update(editProduct).subscribe(result=>{
      alert("Product Update Successfully");
      this.router.navigate(["/products"]);

    }
    ,
    error=>{
      alert("Error Occure While Updating Product");
    }
    )
  }
  createProduct(editProduct: SaveProduct) {
    this.productService.create(editProduct).subscribe(result=>{
      alert("Product Create Successfully");
      this.router.navigate(["/products"]);

    }
    ,
    error=>{
      alert("Error Occure While Create Product");
    }
    )
  }
  prepareProduct(): SaveProduct {
        const productControls = this.productForm.controls;
        const _product = new SaveProduct();
        _product.id = this.product.id;
        _product.categoryId = parseInt(productControls["categoryId"].value);
        _product.productName = productControls["productName"].value;
        return _product;
  }

}
