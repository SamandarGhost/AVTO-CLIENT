import { Direction } from "../../enums/common.enum";
import { DealerBrand, DealerLocation, DealerStatus } from "../../enums/dealer.enum";

export interface DealerInput {

    dealerTitle: string;
    dealerBrand: DealerBrand;
    dealerPassword: string;
    dealerLocation: DealerLocation;
    dealerAddress: string;
    dealerImage: string;
    dealerImages?: string[];
    dealerPhone: string;
    dealerPhone2?: string;
    dealerEmail: string;
    dealerKakaoTalk?: string;
    dealerShortDesc: string;
    dealerOpenAt: string;
    dealerCloseAt: string;
    memberId?: string;
}

export interface DealerLogin {

    dealerTitle: string;
    dealerPassword: string;
    dealerLocation: DealerLocation;
}

interface DISearch {
    memberId?: string;
    brandList?: DealerBrand[];
    locationList?: DealerLocation[];
    text?: string;
}

export interface DealersInquiry {
    page: number;
    limit: number;
    sort?: number;
    direction?: Direction;
    search?: DISearch;
}

interface ALDISearch {
    dealerStatus?: DealerStatus;
    locationList?: DealerLocation[];
    brandList?: DealerBrand[];
    text?: string;
}

export interface AllDealersInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: ALDISearch;
}