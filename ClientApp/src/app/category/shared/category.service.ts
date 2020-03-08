import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { SharedService } from "src/app/shared/shared.service";
import { Category } from "./category.model";


@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
  
    private readonly categoryEndPoint = environment.API_BASE_URL +'/api/categories';
  
    constructor(private http: HttpClient, private sharedService: SharedService) { }
  
    create(category: Category) {
      return this.http.post(this.categoryEndPoint, category);
    }
  
    getCategory(id) {
      return this.http.get(this.categoryEndPoint + '/' + id);
    }
  
    getCategories() {
      return this.http.get(this.categoryEndPoint);
    }
  
    update(category: Category) {
      return this.http.put(this.categoryEndPoint, category);
    }
  
    delete(id) {
      return this.http.delete(this.categoryEndPoint + '/' + id);
    }

  }