import { createRef } from "react"
import { Book } from "../types/types"

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

      <div className="modal-box">
        <h3 className="font-bold text-lg">{book?.title}</h3>
        <p className="py-4">{book?.subtitle}</p>
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