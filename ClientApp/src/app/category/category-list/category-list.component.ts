import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories : Category[];
  constructor(private categoryService : CategoryService,private router : Router) { }

  ngOnInit() 
  {
    this.categoryService.getCategories().subscribe(result =>{
       this.categories = result as Category[];
    },
    error=> {
      alert("Error occures while loding categories");
    }
    )
  }
  edit(id){
    this.router.navigate(["/categories/edit", id]);
  }

}
