import { useRef, useState } from 'react'
import { Book, Pagination, ResultFormat } from './types'
import { getBooks } from './client'
import PaginationButtons from './PaginationButtons'
import BookList from './BookList'
import NavigationBar from './NavigationBar'

function App() {
  const search = useRef<string>("")
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<Pagination>({ startIndex: 0, maxResults: 10, page: 0 })
  const [resultFormat, setResultFormat] = useState<ResultFormat>("Default")

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
      resultFormat={resultFormat}
      onResultFormatChange={setResultFormat}
    />
    <div className="m-5">
      {books.length > 0
        ? <BookList
          books={books}
          resultFormat={resultFormat}
        />
        : search.current === "" ? <p>Have a book in mind?</p> : <p>No result.</p>
      }
    </div>
    <div className="flex items-center justify-center mb-5">
      <PaginationButtons
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </div>
  </>)
}

export default App
