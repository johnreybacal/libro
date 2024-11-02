import { useState } from "react"
import { Book } from "./types"

const TABLE = "Table";
const GRID = "Grid";
type Format = typeof TABLE | typeof GRID

function BookList({ books }: {
  books: Book[]
}) {
  const [format, setFormat] = useState<Format>("Grid")

  return (
    <>
      <select
        className="select w-full max-w-xs"
        value={format}
        onChange={(e) => setFormat(e.target.value as Format)}
      >
        <option value={TABLE}>Table</option>
        <option value={GRID}>Grid</option>
      </select>
      {format === "Table" &&
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Authors</th>
              <th>Categories</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => <tr key={book.id}>
              <td>
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    style={{ width: '100%' }} />
                </div>
              </td>
              <td>{book.title}</td>
              <td>{book.authors?.join(", ")}</td>
              <td>{book.categories?.join(", ")}</td>
            </tr>)}
          </tbody>
        </table>
      }
      {format === "Grid" &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {books.map((book) => {
            return (
              <div className="card shadow-xl" key={book.id}>
                <figure style={{ maxHeight: 250, overflow: 'hidden' }}>
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    style={{ width: '100%' }} />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title">{book.title}</h2>
                  <p>{book.authors?.join(", ")}</p>
                  <p>{book.categories?.join(", ")}</p>
                </div>
              </div>
            )
          })}
        </div>
      }
    </>
  )
}

export default BookList