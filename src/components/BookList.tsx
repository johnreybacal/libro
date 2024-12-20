import { useContext } from "react"
import { Book } from "../types"
import { GlobalContext } from "../lib/GlobalContext"

function BookList({ books }: {
  books: Book[],
}) {
  const { resultFormat } = useContext(GlobalContext)

  return (
    <>
      {resultFormat === "Default" &&
        <ul role="list" className="divide-y">
          {books.map((book) => <li key={book.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="flex-none" src={book.imageLinks?.thumbnail} />
              <div className="min-w-0 flex-auto">
                <a
                  className="link link-hover text-sm/6 font-semibold line-clamp-2"
                  href={`${import.meta.env.BASE_URL}/${book.id}`}
                >
                  {book.title}</a>
                <p className="mt-1 truncate text-xs/5">{book.authors?.join(", ")}</p>
                <p className="mt-1 line-clamp-3 text-xs/5">{book.description}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6"><time>{book.publishedDate}</time></p>
            </div>
          </li>)}
        </ul>
      }
      {resultFormat === "Compact" &&
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Authors</th>
              <th>Publication date</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => <tr key={book.id}>
              <td>
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={book.imageLinks?.thumbnail} />
                </div>
              </td>
              <td><a
                className="link link-hover text-sm/6 font-semibold line-clamp-2"
                href={`${import.meta.env.BASE_URL}/${book.id}`}
              >
                {book.title}
              </a></td>
              <td>{book.authors?.join(", ")}</td>
              <td>{book.publishedDate}</td>
            </tr>)}
          </tbody>
        </table>
      }
    </>
  )
}

export default BookList