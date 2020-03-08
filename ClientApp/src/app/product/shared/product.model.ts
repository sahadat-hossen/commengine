import { Entity, KeyValuePair } from "src/app/shared/shared.model";

export class Product extends Entity{
    productName : string;
    category : KeyValuePair;
}

export class SaveProduct {
    id :number;
    productName : string;
    categoryId : number;
}