import { Direction } from "../../enums/common.enum";
import { ProductStatus, ProductType } from "../../enums/product.enum";

export interface ProductInput {
    productType: ProductType;
    productTitle: string;
    productPrice: number;
    productQuantity?: number;
    productImages?: string[]
    productShortDesc?: string;
    productDesc?: string;
    memberId?: string;
}

export interface PriceRange {
    minPrice: number;
    maxPrice: number;
}

interface PISearch {
    memberId?: string;
    typeList?: ProductType[];
    priceRange?: PriceRange;
    text?: string;
    productStatus?: ProductStatus;
}

export interface ProductsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: PISearch;
}

interface CSPISearch {
    productStatus?: ProductStatus;
}

export interface SellerProductsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: CSPISearch;
}

interface ALPISearch {
    productStatus?: ProductStatus;
    productTypeList?: ProductType[];
    text?: string;
}

export interface AllProductsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: ALPISearch;
}