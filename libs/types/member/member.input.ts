import { Direction } from "../../enums/common.enum";
import { AuthType, Status, Type } from "../../enums/member.enum";

export interface MemberInput {
    titleNick: string;
    password: string;
    phone: string;
    type?: Type;
    authType?: AuthType;
};

export interface LoginInput {
    titleNick: string;
    password: string;
};

interface AISearch {
    text?: string;
}

export interface AgentsInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: AISearch;
};

interface MISearch {
    status?: Status;
    type?: Type;
    text?: string;
}

export interface MembersInquiry {
    page: number;
    limit: number;
    sort?: string;
    direction?: Direction;
    search: MISearch;
};