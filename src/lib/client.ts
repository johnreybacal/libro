import axios from "axios";
import { Book, Pagination } from "../types";
import { Schema$Volume } from "../types/googlebooksapi";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes/";

export async function getBooks(search: string, pagination: Pagination) {
  const response = await axios.get(GOOGLE_BOOKS_API, {
    params: {
      q: search,
      projection: "lite",
      maxResults: pagination.maxResults,
      startIndex: pagination.startIndex,
    },
  });

  if (response.status !== 200) {
    throw Error(response.data);
  }

  if (!response.data.items) {
    return {
      totalItems: 0,
      books: [],
    };
  }

  const totalItems: number = response.data.totalItems;
  const items: Schema$Volume[] = response.data.items;
  const books: Book[] = items.map(({ id, volumeInfo }) => {
    return {
      id: id!,
      ...volumeInfo,
    };
  });

  return {
    totalItems,
    books,
  };
}

export async function getBook(id: string) {
  const url = `${GOOGLE_BOOKS_API}${id}`;
  const response = await axios.get(url);

  return response.data;
}
