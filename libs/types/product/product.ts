import { ProductStatus, ProductType } from "../../enums/product.enum";
import { MeLiked } from "../like/like";
import { Member, TotalCounter } from "../member/member";

export interface Product {
    _id: string;
    productType: ProductType;
    productStatus: ProductStatus;
    productTitle: string;
    productPrice: number;
    productQuantity: number;
    productImages?: string;
    productShortDesc?: string;
    productDesc?: string;
    productViews: number;
    productLikes: number;
    productSave: number;
    productComments: number;
    productRank: number;
    memberId: string;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    creatorData?: Member;
    meLiked?: MeLiked[];
}

export interface Products {
    list: Product[];
    metaCounter: TotalCounter[];
}

