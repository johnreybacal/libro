export interface Book {
  id: string;
  title: string;
  authors: string[];
  categories: string[];
  thumbnail: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  count?: number;
}
