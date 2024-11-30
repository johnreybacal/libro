import { createRef } from "react"
import { Book } from "../types/types"
import parse from 'html-react-parser';

function BookDetailDialog({
  book
}: {
  book: Book | undefined
}) {
  const ref = createRef<HTMLDialogElement>()

  function showModal() {
    ref.current?.showModal()
  }

  return <>
    <button className="mt-10 btn btn-primary" onClick={showModal}>More information</button>
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box !max-w-5xl">
        <h3 className="font-bold text-lg">{book?.title}</h3>
        {book?.subtitle && <p className="py-3">
          {book.subtitle}
        </p>}
        {book?.description && <div className="mt-1 line-clamp-10">
          {parse(book.description)}
        </div>}

        <div className="divider mt-10">Work in progress :)</div>
        <progress className="progress w-full"></progress>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
}

export default BookDetailDialog