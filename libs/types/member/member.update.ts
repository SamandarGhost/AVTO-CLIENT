import { MemberStatus, MemberType } from "../../enums/member.enum";

export interface MemberUpdate {
    _id: string;
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick?: string;
    memberPhone?: string;
    memberPhone2?: string;
    memberEmail?: string;
    memberKakaoTalk?: string;
    memberYoutube?: string;
    memberInstagram?: string;
    memberFacebook?: string;
    memberTikTok?: string;
    memberNaverBlog?: string;
    memberXcom?: string;
    memberPassword?: string;
    memberFullName?: string;
    memberAddress?: string;
    memberImage?: string;
    memberDesc?: string;
    dealerId?: string;
    deletedAt?: Date;
}