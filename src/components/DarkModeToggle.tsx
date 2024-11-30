import { useContext } from "react"
import { GlobalContext } from "../lib/GlobalContext"

function DarkModeToggle() {
  const context = useContext(GlobalContext)

  return <div className="grid-cols-2">
    Dark mode
    <input
      type="checkbox"
      className="toggle theme-controller justify-self-end"
      checked={context.theme === "dark"}
      onChange={() => {
        if (context.theme === "light") {
          context.setTheme("dark")
        } else {
          context.setTheme("light")
        }
      }}
    />
  </div>
}

export default DarkModeToggle