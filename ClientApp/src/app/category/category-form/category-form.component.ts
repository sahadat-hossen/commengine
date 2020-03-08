import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../shared/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category;
  categoryForm : FormGroup;
  constructor(private categoryService : CategoryService, private router: Router, private activatedRoute: ActivatedRoute,private formBuilder : FormBuilder) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params => {
          const id = params["id"];
          if (id) {
              this.categoryService
                  .getCategory(id)
                  .subscribe(res => {
                      if (res) {
                          this.category = res as Category;
                          this.initCategory();
                      }
                  });
          } else {
              this.category = new Category();
              this.initCategory();
          }
      }
    )
  }
  initCategory() {
    this.categoryForm = this.formBuilder.group({
        categoryName :[this.category.categoryName,Validators.required]
    });
  }
  onSubmit(){
    const editCategory = this.prepareCategory();

        if (editCategory.id) {
            this.updateCategory(editCategory);
        } else {
            this.createCategory(editCategory);
        }
  }
  updateCategory(editCategory: Category) {
    this.categoryService.update(editCategory).subscribe(result=>{
      alert("Category Update Successfully");
      this.router.navigate(["/categories"]);

    }
    ,
    error=>{
      alert("Error Occure While Updating Category");
    }
    )
  }
  createCategory(editCategory: Category) {
    this.categoryService.create(editCategory).subscribe(result=>{
      alert("Category Create Successfully");
      this.router.navigate(["/categories"]);

    }
    ,
    error=>{
      alert("Error Occure While Create Category");
    }
    )
  }
  prepareCategory(): Category {
        const categoryControls = this.categoryForm.controls;
        const _category = new Category();

        _category.clear();
        _category.id = this.category.id;
        _category.categoryName = categoryControls["categoryName"].value;
        return _category;
  }
}
