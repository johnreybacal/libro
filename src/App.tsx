import { useState } from 'react'
import './App.css'
import { Book } from './types'
import { getBooks } from './client'

function App() {
  const [search, setSearch] = useState<string>("")
  const [books, setBooks] = useState<Book[]>([])

  async function performSearch() {
    const books = await getBooks(search)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {
            books.map((book) => {
              return (
                <div className="card shadow-xl">
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
      </div>
    </div>
  )
}

export default App
