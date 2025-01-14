import { ArticleCategory, ArticleStatus } from '../../enums/article.enum';
import { Member } from '../member/member';
import { MeLiked, TotalCounter } from '../property/property';

export interface Article {
	_id: string;
	articleCategory: ArticleCategory;
	articleStatus: ArticleStatus;
	articleTitle: string;
	articleContent: string;
	articleImage: string;
	articleViews: number;
	articleLikes: number;
	articleComments: number;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	creatorData?: Member;
	meLiked?: MeLiked[];
}

export interface Articles {
	list: Article[];
	metaCounter: TotalCounter[];
}
