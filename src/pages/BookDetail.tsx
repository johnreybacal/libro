import { createRef, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../types/types";
import { getBook } from "../lib/client";
import parse from 'html-react-parser';
import DarkModeToggle from "../components/DarkModeToggle";
import BookDetailDialog from "../components/BookDetailDialog";
import Loading from "../components/Loading";


function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState<Book>()
  const image = useMemo(() => {
    const image = book?.imageLinks

    return image?.extraLarge ?? image?.large ?? image?.medium ?? image?.small ?? image?.thumbnail ?? image?.smallThumbnail
  }, [book])
  const detailDialog = createRef<HTMLDialogElement>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    setIsLoading(true)
    getBook(id!).then(({ volumeInfo }) => {
      setBook(volumeInfo)
    }).catch((reason) => {
      setError(reason)
    }).finally(() => setIsLoading(false))
  }, [id])

  function onBack() {
    history.back()
  }

  function onDetail() {
    detailDialog.current?.showModal()
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">Something's wrong</h1>
        <p className="mt-6 text-lg font-medium sm:text-xl/8">There's seems to be a problem here.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            className="btn btn-primary"
            href={"/"}
          >
            Back to home
          </a>
        </div>
      </div>
    </main>
  }

  return <>
    <div className="navbar fixed top-0 z-50">
      <div className="navbar-start">
        <a className="btn btn-ghost" onClick={onBack}>Back to list</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-2 shadow"
          >
            <li>
              <DarkModeToggle></DarkModeToggle>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={image}
          className="max-w-sm rounded-lg shadow-2xl w-200" />
        <div>
          <h1 className="text-5xl font-bold">{book?.title}</h1>
          {book?.authors && <p className="py-3">Written by {book.authors.join(", ")}</p>}
          {book?.subtitle && <p className="py-3">
            {book.subtitle}
          </p>}
          {book?.description && <div className="mt-1 line-clamp-10">
            {parse(book.description)}
          </div>}
          <button className="mt-10 btn btn-primary" onClick={onDetail}>More information</button>
        </div>
      </div>
    </div>
    <BookDetailDialog ref={detailDialog} book={book}></BookDetailDialog>
  </>
}

export default BookDetail