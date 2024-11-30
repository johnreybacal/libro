import { useContext, useState } from "react"
import { ResultFormat } from "./types"
import { GlobalContext } from "./GlobalContext"
import DarkModeToggle from "./DarkModeToggle"

function NavigationBar({ onSearch }: {
  onSearch: (query: string) => void
}) {
  const context = useContext(GlobalContext)
  const [search, setSearch] = useState<string>("")

  return (<div className="navbar bg-base-100 fixed top-0 z-50">
    <div className="navbar-start">
      <a className="btn btn-ghost text-xl">libro</a>
    </div>
    <div className="navbar-center">
      <label className="input input-bordered flex w-72 items-center gap-2">
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
      </label>
    </div>
    <div className="navbar-end">
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
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-2 shadow"
        >
          <li>
            <div className="grid-cols-2">
              Result Format
              <select
                className="select max-w-xs select-sm"
                value={context.resultFormat}
                onChange={(e) => context.setResultFormat(e.target.value as ResultFormat)}
              >
                <option value={"Default"}>Default</option>
                <option value={"Compact"}>Compact</option>
              </select>

            </div>
          </li>
          <li>
            <DarkModeToggle></DarkModeToggle>
          </li>
        </ul>
      </div>
    </div>
  </div>)
}

export default NavigationBar