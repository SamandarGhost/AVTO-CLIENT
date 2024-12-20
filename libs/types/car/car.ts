import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarSort, CarStatus, CarTransmission, CarTuningType, CarType } from "../../enums/car.enum";
import { Dealer } from "../dealer/dealer";
import { MeLiked } from "../like/like";
import { Member, TotalCounter } from "../member/member";

export interface Car {
    _id: string;
    carType: CarType;
    carTitle: string;
    carBody: CarBody;
    carStatus: CarStatus;
    carSort: CarSort;
    carGroup: CarGroup;
    carMadeIn: CarMadeIn;
    carBrand: CarBrand;
    carModel: string;
    carPrice: number;
    carImages: string[];
    carVideo?: string;
    carLocation: CarLocation;
    carAddress: string;
    carDesc?: string
    carBarter: boolean;
    carRent: boolean;
    carYear: number;
    carTuning: boolean;
    carTuningType?: CarTuningType;
    carMileage: number;
    carFuelType: CarFuelType;
    carDriveType: CarDriveType;
    carTransmission: CarTransmission;
    carEngineSize: string;
    carColor: CarColor;
    carFullFuel: number;
    carMpgHw: number;
    carMpgCity: number;
    carDoor?: number;
    carCylinders?: number;
    carMaxSpeed?: number;
    carHundredSpeed?: string;
    carHorsePower?: number;
    carTorque?: string;
    carLength?: string;
    carHeigth?: string;
    carWidth?: string;
    carSeatsUp?: number;
    carWeigth?: number;
    carLoadWeight?: number;
    carTireSize?: string;
    carWheelBase?: string;
    carAutoBrake: boolean;
    carCruiseControl: boolean;
    carESC: boolean;
    carAutonomuosDrive: boolean;
    carExteriorLight: boolean;
    carPanoramicSunroof: boolean;
    carHeatedSeats: boolean;
    carCooledSeats: boolean;
    carTouchscreenDisplay: boolean;
    carAutoHeadLight: boolean;
    carStarStop: boolean;
    carNoiseCancellation: boolean;
    carRemoteKeyless: boolean;
    carLaneDW: boolean;
    carBlindSpotMonitoring: boolean;
    carRearCrossTrafficAlert: boolean;
    carApplePlay: boolean;
    carAndroidAuto: boolean;
    carVoiceControl: boolean;
    carBluetoothConnectivity: boolean;
    carWirelessCharging: boolean;
    carParkingAssist: boolean;
    carSurroundViewCamera: boolean;
    carFrontSensors: boolean;
    carRearSensors: boolean;
    carFrontRecordCamera: boolean;
    carRearRecordCamera: boolean;
    carHeadsUpDisplay: boolean;
    carClimateControl: boolean;
    carAdjustableSeats: boolean;
    carMemorySeats: boolean;
    carPowerTrain: boolean;
    carRegenerativeBraking: boolean;
    carTractionControl: boolean;
    carStabilityControl: boolean;
    carHillStartAssist: boolean;
    carTirePressureSystem: boolean;
    carPushButton: boolean;
    carCrush: number;
    carRepair: number;
    carFrontBumper: boolean;
    carBackBumper: boolean;
    carBonnet: boolean;
    carTailgate: boolean;
    carRightFrontWing: boolean;
    carLeftFrontWing: boolean;
    carRightBackWing: boolean;
    carLeftBackWing: boolean;
    carRoof: boolean;
    carRightFrontDoor: boolean;
    carLeftFrontDoor: boolean;
    carRightBackDoor: boolean;
    carLeftBackDoor: boolean;
    carViews: number;
    carLikes: number;
    carSave: number;
    carComments: number;
    carRank: number;
    memberId: string;
    dealerId?: string;
    carCreatedBy?: string;
    soldAt?: Date;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    creatorData?: Member | Dealer;
    meLiked?: MeLiked[];
}

export interface Cars {
    list: Car[];
    metaCounter: TotalCounter[];
}