import { useEffect, useRef, useState } from 'react'
import { Book, Pagination } from '../types/types'
import { getBooks } from '../lib/client'
import PaginationButtons from '../components/PaginationButtons'
import BookList from '../components/BookList'
import NavigationBar from '../components/NavigationBar'
import Loading from '../components/Loading'
import ErrorPage from './ErrorPage'

function setQuery(query: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(query).forEach((query) => {
    url.searchParams.set(query[0], query[1]);
  })
  window.history.pushState(null, '', url.toString());
}

function Index() {
  const search = useRef<string>("")
  const [books, setBooks] = useState<Book[]>([])
  const [pagination, setPagination] = useState<Pagination>({ startIndex: 0, maxResults: 10, page: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  function onSearch(query: string) {
    if (query === search.current) {
      return
    }

    search.current = query
    pagination.startIndex = 0

    setQuery({
      "search": query,
      "page": "1"
    })

    setIsLoading(true)
    getBooks(query, pagination)
      .then(({ totalItems, books }) => {
        setPagination({
          ...pagination,
          totalItems,
          page: 0,
          maxPage: Math.floor(totalItems / pagination.maxResults) - 1
        })
        setBooks(books)
      }).catch((reason) => {
        setError(reason)
      }).finally(() => setIsLoading(false))
  }

  function onPageChange(page: number) {
    pagination.page = page;
    pagination.startIndex = pagination.maxResults * (page)

    setQuery({
      "page": String(page + 1)
    })

    setIsLoading(true)
    getBooks(search.current, pagination)
      .then(({ totalItems, books }) => {
        setPagination({
          ...pagination,
          totalItems,
          maxPage: Math.floor(totalItems / pagination.maxResults) - 1
        })

        setBooks(books)
      }).catch((reason) => {
        setError(reason)
      }).finally(() => setIsLoading(false))

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    const pageQuery = urlParams.get("page")

    if (!searchQuery) {
      return
    }

    search.current = searchQuery

    if (pageQuery) {
      onPageChange(Number(pageQuery) - 1)
    } else {
      onPageChange(0)
    }
  }, [])

  if (error) {
    return <ErrorPage></ErrorPage>
  }

  return (<>
    <NavigationBar
      onSearch={onSearch}
    />
    {isLoading ? <Loading></Loading> : <>
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
    </>}
  </>)
}

export default Index
