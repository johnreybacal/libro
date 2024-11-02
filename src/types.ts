export interface Book {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  thumbnail: string;
}

export interface Pagination {
  startIndex: number;
  maxResults: number;
  totalItems?: number;
  page: number;
  maxPage?: number;
}
