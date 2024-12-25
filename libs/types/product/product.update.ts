import { ProductStatus, ProductType } from "../../enums/product.enum";

export interface ProductUpdate {
    _id: string;
    productType?: ProductType;
    productStatus?: ProductStatus;
    productTitle?: string;
    productPrice?: number;
    productQuantity?: number;
    productImages?: string[];
    productShortDesc?: string;
    productDesc?: string;
    deletedAt?: Date;
}