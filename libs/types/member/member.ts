import { AuthType, Brand, CarServiceType, Location, Status, Type } from "../../enums/member.enum";
import { MeFollowed } from "../follow/follow";
import { MeLiked } from "../like/like";

export interface Member {
    _id: string;
    type: Type;
    status: Status;
    authType: AuthType;
    titleNick: string;
    password?: string;
    fullName?: string;
    image?: string;
    viewImage?: string;
    address?: string;
    shortDesc?: string;
    longDesc?: string;
    phone: string;
    phone2?: string;
    email?: string;
    kakaoTalk?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
    tikTok?: string;
    naverBlog?: string;
    xcom?: string;
    followers: number;
    followings: number;
    likes: number;
    views: number;
    comments: number;
    warnings: number;
    articles: number;
    blocks: number;
    memberCars: number;
    usedCars: number;
    newCars: number;
    rank: number;
    points: number;
    sellerProducts: number;
    dealerFinancing: boolean;
    dealerCarService: boolean;
    dealerTradeIn: boolean;
    dealerCustomization: boolean;
    dealerWarranties: boolean;
    dealerParts: boolean;
    dealerAccessories: boolean;
    dealerCarDetailing: boolean;
    dealerCarWash: boolean;
    dealerCarTestDrive: boolean;
    dealerCarDelivery: boolean;
    carOilChange: boolean;
    carAlignment: boolean;
    carTireChange: boolean;
    carBrakeCheck: boolean;
    carBatteryCheck: boolean;
    carTireBalance: boolean;
    carSuspension: boolean;
    carAirCondition: boolean;
    carTransmissionCheck: boolean;
    carEngineDiagnostic: boolean;
    carExhaust: boolean;
    carDetailing: boolean;
    carWindshield: boolean;
    carTimingBelt: boolean;
    carChainReplacement: boolean;
    comfort: number;
    performance: number;
    exterior: number;
    interior: number;
    reliability: number;
    fast: number;
    openAt?: string;
    closeAt?: string;
    openSunday?: string;
    closeSunday?: string;
    openSaturday?: string;
    closeSaturday?: string;
    publicHolidays: boolean;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    accessToken?: string
    meLiked?: MeLiked[];
    meFollowed?: MeFollowed[];
}
export interface TotalCounter {
    total: number;
}

export interface Members {
    list: Member[];
    metaCounter: TotalCounter[];
}