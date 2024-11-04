import { useRef, useState } from 'react'
import { Book, Pagination } from './types'
import { getBooks } from './client'
import PaginationButtons from './PaginationButtons'
import BookList from './BookList'
import NavigationBar from './NavigationBar'

function Index() {
  const search = useRef<string>("")
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<Pagination>({ startIndex: 0, maxResults: 10, page: 0 })

  function onSearch(query: string) {
    if (query === search.current) {
      return
    }

    search.current = query
    pagination.startIndex = 0

    getBooks(query, pagination)
      .then(({ totalItems, books }) => {
        setPagination({
          ...pagination,
          totalItems,
          page: 0,
          maxPage: Math.floor(totalItems / pagination.maxResults) - 1
        })
        setBooks(books)
      })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onPageChange(page: number) {
    pagination.page = page;
    pagination.startIndex = pagination.maxResults * (page)

    getBooks(search.current, pagination)
      .then(({ books }) => {
        setPagination({
          ...pagination
        })

        setBooks(books)
      })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (<>
    <NavigationBar
      onSearch={onSearch}
    />
    <div className="m-5 mt-16">
      {books.length > 0
        ? <BookList
          books={books}
        />
        : <div className="flex items-center justify-center pt-20">
          {search.current === ""
            ? <p className="text-xl">Have a book in mind?</p>
            : <p className="text-xl">No result.</p>}
        </div>
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

export default Index
