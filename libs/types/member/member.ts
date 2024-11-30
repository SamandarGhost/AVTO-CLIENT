import { MemberAuthType, MemberStatus, MemberType } from "../../enums/member.enum";
import { MeFollowed } from "../follow/follow";
import { MeLiked } from "../like/like";

export interface Member {
    _id: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberAuthType: MemberAuthType;
    memberPhone: string;
    memberNick: string;
    memberPassword?: string;
    memberFullName?: string;
    memberImage: string;
    memberAddress?: string;
    memberPhone2?: number;
    memberEmail?: string;
    memberKakaoTalk?: string;
    memberYoutube?: string;
    memberInstagram?: string;
    memberFacebook?: string;
    memberTikTok?: string;
    memberNaverBlog?: string;
    memberXcom?: string;
    memberDesc?: string;
    memberCars: number;
    memberProducts: number;
    memberArticles: number;
    memberFollowers: number;
    memberFollowings: number;
    memberPoints: number;
    memberLikes: number;
    memberViews: number;
    memberComments: number;
    memberRank: number;
    memberWarnings: number;
    memberBlocks: number;
    dealerId?: string;
    carServiceId?: string;
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