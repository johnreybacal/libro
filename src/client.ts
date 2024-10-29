import axios from "axios";
import { Book } from "./types";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes/";

export async function getBooks(search: string) {
  const response = await axios.get(GOOGLE_BOOKS_API, {
    params: {
      q: search,
    },
  });

  if (response.status !== 200) {
    throw Error(response.data);
  }

  const items: [] = response.data.items;
  const books: Book[] = items.map(({ id, volumeInfo }) => {
    const { title, authors, categories } = volumeInfo;
    const { thumbnail } = volumeInfo["imageLinks"];
    return { id, title, authors, categories, thumbnail };
  });

  return books;
}
