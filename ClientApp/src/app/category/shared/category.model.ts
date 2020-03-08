import { Entity } from "src/app/shared/shared.model";


export class Category extends Entity
{
    categoryName :string;
    clear(){
        this.categoryName ='';
    }
}