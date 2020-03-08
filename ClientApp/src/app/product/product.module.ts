import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
      path: "products",
      component: ProductComponent,
      children: [
          {
              path: "",
              redirectTo: "products",
              pathMatch: "full"
          },
          {
              path: "products",
              component: ProductListComponent
            },
          {
              path: "new",
              component: ProductFormComponent
          },
          {
              path: "edit/:id",
              component: ProductFormComponent
        }
      ]
  }
];
@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ProductModule { }
