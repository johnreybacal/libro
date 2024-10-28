import { useState } from 'react'
import axios from 'axios'
import './App.css'

interface Book {
  title: string;
  authors: string[];
  categories: string[];
  thumbnail: string;
}

function App() {
  const [search, setSearch] = useState<string>("")
  const [books, setBooks] = useState<Book[]>([])

  async function performSearch() {
    axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: search
      }
    })
      .then(function (response) {
        // handle success
        const items: [] = response.data.items;
        const books: Book[] = [];
        items.forEach(({ volumeInfo }) => {
          const { title, authors, categories } = volumeInfo;
          const { thumbnail } = volumeInfo['imageLinks']
          books.push({ title, authors, categories, thumbnail })
        })
        setBooks(books)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
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
            <button className="btn btn-primary" onClick={performSearch}>
              Search
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Authors</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {
              books.map((book, index) => {
                return (<tr key={index}>
                  <div className="mask mask-squircle h20 w-12">
                    <img
                      src={book.thumbnail}
                      alt={book.title} />
                  </div>
                  <th>{book.title}</th>
                  <td>{book.authors?.join(", ")}</td>
                  <td>{book.categories?.join(", ")}</td>
                </tr>)
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
