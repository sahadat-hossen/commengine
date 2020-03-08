import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "src/app/shared/shared.service";
import { SaveProduct, Product } from "./product.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    private readonly productEndPoint = environment.API_BASE_URL +'/api/products';
  
    constructor(private http: HttpClient, private sharedService: SharedService) { }
  
    create(product: SaveProduct) {
        product.id =0;
      return this.http.post(this.productEndPoint, product);
    }
  
    getProduct(id) {
      return this.http.get(this.productEndPoint + '/' + id);
    }
  
    getProducts() {
      return this.http.get(this.productEndPoint);
    }
  
    update(product: SaveProduct) {
      return this.http.put(this.productEndPoint, product);
    }
  
    delete(id) {
      return this.http.delete(this.productEndPoint + '/' + id);
    }
   getCategories(){
       return this.http.get(this.productEndPoint+"/categories");
   }
  }