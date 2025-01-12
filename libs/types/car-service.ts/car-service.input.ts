import { Direction } from "../../enums/common.enum";
import { Status } from "../../enums/member.enum";

export interface CarServiceInput {
    carServiceTitle: string;
    carServicePassword: string;
    carServiceLocation: CarServiceLogin;
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
}

interface CSISearch {
    memberId?: string;
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
    carServiceStatus?: Status;
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