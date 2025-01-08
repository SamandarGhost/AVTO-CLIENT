import { CarBody, CarBrand, CarColor, CarDriveType, CarFuelType, CarGroup, CarLocation, CarMadeIn, CarStatus, CarTransmission, CarType } from "../../enums/car.enum";
import { Direction } from "../../enums/common.enum";

export interface CarInput {
    carType: CarType;
    carTitle: string;
    carBody: CarBody;
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
    carBarter?: boolean;
    carRent?: boolean;
    carYear: number;
    carMileage: number;
    carFuelType: CarFuelType;
    carDriveType: CarDriveType;
    carTransmission: CarTransmission;
    carEngineSize: string;
    carColor: CarColor;
    carFullFuel: string;
    carMpgHw: number;
    carMpgCity: number;
    carDoor?: string;
    carCylinders?: string;
    carMaxSpeed?: string;
    carHundredSpeed?: string;
    carHorsePower?: string;
    carTorque?: string;
    carLength?: string;
    carHeigth?: string;
    carWidth?: string;
    carSeatsUp?: string;
    carWeigth?: string;
    carLoadWeight?: string;
    carTireSize?: string;
    carWheelBase?: string;
    carAutoBrake?: boolean;
    carCruiseControl?: boolean;
    carESC?: boolean;
    carAutonomuosDrive?: boolean;
    carExteriorLight?: boolean;
    carPanoramicSunroof?: boolean;
    carHeatedSeats?: boolean;
    carCooledSeats?: boolean;
    carTouchscreenDisplay?: boolean;
    carAutoHeadLight?: boolean;
    carStarStop?: boolean;
    carNoiseCancellation?: boolean;
    carRemoteKeyless?: boolean;
    carLaneDW?: boolean;
    carBlindSpotMonitoring?: boolean;
    carRearCrossTrafficAlert?: boolean;
    carApplePlay?: boolean;
    carAndroidAuto?: boolean;
    carVoiceControl?: boolean;
    carBluetoothConnectivity?: boolean;
    carWirelessCharging?: boolean;
    carParkingAssist?: boolean;
    carSurroundViewCamera?: boolean;
    carFrontSensors?: boolean;
    carRearSensors?: boolean;
    carFrontRecordCamera?: boolean;
    carRearRecordCamera?: boolean;
    carHeadsUpDisplay?: boolean;
    carClimateControl?: boolean;
    carAdjustableSeats?: boolean;
    carMemorySeats?: boolean;
    carPowerTrain?: boolean;
    carRegenerativeBraking?: boolean;
    carTractionControl?: boolean;
    carStabilityControl?: boolean;
    carHillStartAssist?: boolean;
    carTirePressureSystem?: boolean;
    carPushButton?: boolean;
    carCrush?: number;
    carRepair?: number;
    carFrontBumper?: boolean;
    carBackBumper?: boolean;
    carBonnet?: boolean;
    carTailgate?: boolean;
    carRightFrontWing?: boolean;
    carLeftFrontWing?: boolean;
    carRightBackWing?: boolean;
    carLeftBackWing?: boolean;
    carRoof?: boolean;
    carRightFrontDoor?: boolean;
    carLeftFrontDoor?: boolean;
    carRightBackDoor?: boolean;
    carLeftBackDoor?: boolean;
    memberId: string;
}
export interface CarRange {
    min: number;
    max: number
}
export interface PeriodRange {
    start: Date;
    end: Date
}

interface CISearch {
    memberId?: string;
    dealerId?: string;
    typeList?: CarType[];
    bodyList?: CarBody[];
    groupList?: CarGroup[];
    madeInList?: CarMadeIn[];
    brandList?: CarBrand[];
    locationList?: CarLocation[];
    fuelTypeList?: CarFuelType[];
    driveTypeList?: CarDriveType[];
    transmissionList?: CarTransmission[];
    colorList?: CarColor[];
    yearRange?: PeriodRange;
    mileageRange?: CarRange;
    priceRange?: CarRange;
    options?: string[];
    text?: string;
}

export interface CarsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: CISearch;
}

interface ACISearch {
    carStatus?: CarStatus;
}

export interface AgentCarsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: ACISearch;
}

interface DCISearch {
    carStatus?: CarStatus;
}

export interface DealerCarsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: DCISearch;
}

interface ALCISearch {
    carStatus?: CarStatus;
    bodyList?: CarBody[];
    groupList?: CarGroup[];
    madeInList?: CarMadeIn[];
    brandList?: CarBrand[];
    locationList?: CarLocation[];
    fuelTypeList?: CarFuelType[];
    text?: string;
}

export interface AllCarsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: ALCISearch;
}

export interface OrdinaryInquiry {
    page: number;
    limit: number;
}