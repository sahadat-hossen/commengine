import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  constructor (private router : Router, private productService : ProductService) { }

  ngOnInit() {
    
    this.productService.getProducts().subscribe(result=>{
      this.products = result as Product[];
    },
    error=>{
      alert("An error occurs while loding Products");
    }
    
    )
  }
  edit(id){
    this.router.navigate(["/products/edit", id]);
  }

}
