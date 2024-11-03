import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "./types";
import { getBook } from "./client";

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    getBook(id!).then(({ volumeInfo }) => {
      setBook(volumeInfo)
    })
    console.log(id)
  }, [id])

  return <p>{book?.title}</p>
}

export default BookDetail