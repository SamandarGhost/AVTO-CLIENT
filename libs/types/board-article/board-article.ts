import { BoardArticleCategory, BoardArticleStatus } from '../../enums/board-article.enum';
import { Dealer } from '../dealer/dealer';
import { Member } from '../member/member';
import { MeLiked, TotalCounter } from '../property/property';

export interface BoardArticle {
	_id: string;
	articleCategory: BoardArticleCategory;
	articleStatus: BoardArticleStatus;
	articleTitle: string;
	articleContent: string;
	articleImage: string;
	articleViews: number;
	articleLikes: number;
	articleComments: number;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;

	creatorData?: Member | Dealer;
	meLiked?: MeLiked[];
}

export interface BoardArticles {
	list: BoardArticle[];
	metaCounter: TotalCounter[];
}
