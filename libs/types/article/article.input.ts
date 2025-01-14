import { ArticleCategory, ArticleStatus } from '../../enums/article.enum';
import { Direction } from '../../enums/common.enum';

export interface ArticleInput {
	articleCategory: ArticleCategory;
	articleTitle: string;
	articleContent: string;
	articleImage?: string;
	memberId?: string;
}

interface BAISearch {
	articleCategory: ArticleCategory;
	text?: string;
}

export interface ArticlesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: BAISearch;
}

interface AAISearch {
	articleStatus?: ArticleStatus;
	articleCategory?: ArticleCategory;
}

export interface AllArticlesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: AAISearch;
}
