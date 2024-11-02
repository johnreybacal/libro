import { useRef, useState } from 'react'
import './App.css'
import { Book, Pagination } from './types'
import { getBooks } from './client'
import PaginationButtons from './PaginationButtons'

function App() {
  const [search, setSearch] = useState<string>("")
  const searched = useRef<string>("")
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<Pagination>({ startIndex: 0, maxResults: 12, page: 0 })

  async function performSearch() {
    searched.current = search
    pagination.startIndex = 0
    const { totalItems, books } = await getBooks(search, pagination)
    setPagination({
      ...pagination,
      totalItems,
      page: 0,
      maxPage: Math.floor(totalItems / pagination.maxResults) - 1
    })
    setBooks(books)
  }

  async function onPageChange(page: number) {
    pagination.page = page;
    pagination.startIndex = pagination.maxResults * (page)
    const { books } = await getBooks(searched.current, pagination)
    setPagination({
      ...pagination
    })

    setBooks(books)
  }

  return (
    <div className="card bg-base-100 shadow-xl m-5">
      <div className="card-body">
        <div className="grid grid-cols-4 gap-4">
          <div className='grid col-span-3'>
            <input
              type="text"
              value={search}
              onChange={(event) => {
                const value = event.target.value;
                setSearch(value);
              }}
              placeholder="Search here"
              className="input input-bordered w-full"
            />
          </div>
          <div className='grid col-span-1'>
            <button className="btn btn-primary" onClick={performSearch} disabled={search.trim() === ""}>
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {
            books.map((book) => {
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
        <PaginationButtons
          pagination={pagination}
          onPageChange={onPageChange}>
        </PaginationButtons>
      </div>
    </div>
  )
}

export default App
