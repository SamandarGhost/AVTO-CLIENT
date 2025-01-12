import { Status } from "../../enums/member.enum";
import { MeLiked } from "../like/like";
import { TotalCounter } from "../member/member";

export interface CarService {
    _id: string;
    carServiceTitle: string;
    carServicePassword?: string;
    carServiceAddress: string;
    carServiceStatus: Status;
    carServicePhone: string;
    carServicePhone2: string;
    carServcieEmail: string;
    carServiceKakaoTalk: string;
    carServiceImage: string;
    carServiceImages: string[];
    carServiceShortDesc: string;
    carServiceDesc?: string;
    carServiceOpenAt: string;
    carServiceCloseAt: string;
    carServiceWeekendOpenAt?: string;
    carServiceWeekendCloseAt?: string;
    carServicePublicHolidays?: string;
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
    carMemberShipBasic: number;
    carMemberShipStandard: number;
    carMemberShipPremium: number;
    carServiceComfort: number;
    carServiceReliability: number;
    carServiceFast: number;
    carServiceValue: number;
    carServicePoints: number;
    carServiceRank: number;
    memberId: string;
    accessToken?: string;
    meLiked?: MeLiked[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CarServices {
    list: CarService[];
}