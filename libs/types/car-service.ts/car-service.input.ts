import { CarServiceLocation, CarServiceStatus, CarServiceType } from "../../enums/car-service.enum";
import { Direction } from "../../enums/common.enum";

export interface CarServiceInput {
    carServiceType: CarServiceType;
    carServiceTitle: string;
    carServicePassword: string;
    carServiceLocation: CarServiceLocation;
    carServiceAddress: string;
    carServicePhone: string;
    carServicePhone2: string;
    carServcieEmail: number;
    carServiceKakaoTalk: string;
    carServiceImage: string;
    carServiceImages: string[];
    carServiceShortDesc: string;
    carServiceDesc: string;
    carServiceOpenAt: string;
    carServiceCloseAt: string;
    carServiceWeekendOpenAt?: string;
    carServiceWeekendCloseAt?: string;
    carServicePublicHolidays?: boolean;
    carOilChange?: boolean;
    carAlignment?: boolean;
    carTireChange?: boolean;
    carBrakeCheck?: boolean;
    carBatteryCheck?: boolean;
    carTireBalance?: boolean;
    carSuspension?: boolean;
    carAirCondition?: boolean;
    carTransmissionCheck?: boolean;
    carEngineDiagnostic?: boolean;
    carExhaust?: boolean;
    carDetailing?: boolean;
    carWindshield?: boolean;
    carTimingBelt?: boolean;
    carChainReplacement?: boolean;
    carMemberShipBasic?: string;
    carMemberShipStandard?: string;
    carMemberShipPremium: string;
}

export interface CarServiceLogin {
    carServiceTitle: string;
    carServicePassword: string;
    carServiceLocation: CarServiceLocation;
}

interface CSISearch {
    memberId?: string;
    carServiceTypeList?: CarServiceType[];
    carServiceLocationList?: CarServiceLocation[];
    text?: string;
}

export interface CarServicesInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: CSISearch;
}

interface ALCSISearch {
    carServiceStatus?: CarServiceStatus;
    carServiceLocationList?: CarServiceLocation[];
}

export interface AllCarservicesInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: ALCSISearch;
}

export interface OrdinaryInquiry {
    page: number;
    limit: number;
}