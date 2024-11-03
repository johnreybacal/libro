import { Book, ResultFormat } from "./types"

function BookList({ books, resultFormat }: {
  books: Book[],
  resultFormat: ResultFormat
}) {
  return (
    <>
      {resultFormat === "Table" &&
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
                    src={book.imageLinks?.thumbnail}
                    alt={book.title}
                    style={{ width: '100%' }} />
                </div>
              </td>
              <td>{book.title}</td>
              <td>{book.authors?.join(", ")}</td>
              <td>{book.publishedDate}</td>
            </tr>)}
          </tbody>
        </table>
      }
      {resultFormat === "Grid" &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
          {books.map((book) => {
            return (
              <div className="card shadow-xl" key={book.id}>
                <figure style={{ maxHeight: 250, overflow: 'hidden' }}>
                  <img
                    src={book.imageLinks?.thumbnail}
                    alt={book.title}
                    style={{ width: '100%' }} />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title">{book.title}</h2>
                  <p>{book.authors?.join(", ")}</p>
                  <p>{book.publishedDate}</p>
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