import { SaveGroup } from "../../enums/save.enum";


export interface MeSaved {
    memberId: string;
    saveRefId: string;
    mySaved: boolean;
}

export interface Save {
    _id: string;
    saveGroup: SaveGroup;
    saveRefId: string;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
}