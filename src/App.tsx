import { useRef, useState } from 'react'
import { Book, Pagination } from './types'
import { getBooks } from './client'
import PaginationButtons from './PaginationButtons'
import BookList from './BookList'
import NavigationBar from './NavigationBar'

function App() {
  const search = useRef<string>("")
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<Pagination>({ startIndex: 0, maxResults: 12, page: 0 })

  async function onSearch(query: string) {
    if (query === search.current) {
      return
    }

    search.current = query
    pagination.startIndex = 0
    const { totalItems, books } = await getBooks(query, pagination)
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
    const { books } = await getBooks(search.current, pagination)
    setPagination({
      ...pagination
    })

    setBooks(books)
  }

  return (<>
    <NavigationBar
      onSearch={onSearch}
    />
    <div className="card bg-base-100 shadow-xl m-5">
      <div className="card-body">
        {books.length > 0
          ? <BookList
            books={books}
          />
          : search.current === "" ? <p>Have a book in mind?</p> : <p>No result.</p>
        }
        <div className="m-auto">
          <PaginationButtons
            pagination={pagination}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  </>)
}

export default App
