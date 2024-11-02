import { useState } from "react"

function NavigationBar({ onSearch }: {
  onSearch: (query: string) => Promise<void>
}) {
  const [search, setSearch] = useState<string>("")
  return (<div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">libro</a>
    </div>
    <div className="flex-none gap-2">
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search" value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch(search)
            }
          }} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
      </label>
    </div>
  </div>)
}

export default NavigationBar