import { useEffect, useState } from "react"
import { ResultFormat } from "./types"

function NavigationBar({ onSearch, onResultFormatChange, resultFormat }: {
  onSearch: (query: string) => Promise<void>
  onResultFormatChange: (format: ResultFormat) => void,
  resultFormat: ResultFormat
}) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    document.querySelector('html')!.setAttribute('data-theme', isDarkMode ? "dark" : "light");
  }, [isDarkMode]);


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
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>Result format</li>
        <li>
          <select
            className="select w-full max-w-xs select-sm"
            value={resultFormat}
            onChange={(e) => onResultFormatChange(e.target.value as ResultFormat)}
          >
            <option value={"Table"}>Table</option>
            <option value={"Grid"}>Grid</option>
          </select>
        </li>
        <li>Dark mode</li>
        <li>
          <input
            type="checkbox"
            className="toggle theme-controller"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
        </li>
      </ul>
    </div>
  </div>)
}

export default NavigationBar