import axios from "axios";
import { Book, Pagination } from "./types";
import { Schema$Volume } from "./types.googlebooksapi";

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

  const totalItems: number = response.data.totalItems;
  const items: Schema$Volume[] = response.data.items;
  const books: Book[] = items.map(({ id, volumeInfo }) => {
    return {
      id: id ?? "",
      title: volumeInfo?.title ?? "",
      authors: volumeInfo?.authors ?? [],
      categories: volumeInfo?.categories ?? [],
      thumbnail: volumeInfo?.imageLinks?.thumbnail ?? "",
    };
  });

  return {
    totalItems,
    books,
  };
}
