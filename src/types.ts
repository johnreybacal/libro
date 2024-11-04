import { Schema$Volume } from "./types.googlebooksapi";

type VolumeInfo = NonNullable<Schema$Volume["volumeInfo"]>;

export interface Book extends VolumeInfo {
  id: string;
}

export interface Pagination {
  startIndex: number;
  maxResults: number;
  totalItems?: number;
  page: number;
  maxPage?: number;
}

export type ResultFormat = "Default" | "Compact";

export type Theme = "light" | "dark";
export interface GlobalContextInterface {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resultFormat: ResultFormat;
  setResultFormat: (resultFormat: ResultFormat) => void;
}
