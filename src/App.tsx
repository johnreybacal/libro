import { useRef, useState } from 'react'
import './App.css'
import { Book, Pagination } from './types'
import { getBooks } from './client'
import PaginationButtons from './PaginationButtons'
import BookList from './BookList'

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
        {books.length > 0
          ? <BookList
            books={books}>
          </BookList>
          : searched.current === "" ? <p>Have a book in mind?</p> : <p>No result.</p>
        }
        <PaginationButtons
          pagination={pagination}
          onPageChange={onPageChange}>
        </PaginationButtons>
      </div>
    </div>
  )
}

export default App
