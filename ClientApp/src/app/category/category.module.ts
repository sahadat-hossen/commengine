import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
      path: "categories",
      component: CategoryComponent,
      children: [
          {
              path: "",
              redirectTo: "categories",
              pathMatch: "full"
          },
          {
              path: "categories",
              component: CategoryListComponent
            },
          {
              path: "new",
              component: CategoryFormComponent
          },
          {
              path: "edit/:id",
              component: CategoryFormComponent
        }
      ]
  }
];

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
