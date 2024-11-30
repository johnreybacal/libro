import Index from './pages/Index.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookDetail from './pages/BookDetail.tsx';
import { GlobalContext } from './lib/GlobalContext.ts';
import { ResultFormat, Theme } from './types/types.ts';
import { useEffect, useState } from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/:id",
    element: <BookDetail />
  }
]);

function App() {
  const savedTheme = localStorage.getItem("theme") as Theme ?? "light"
  const savedResultFormat = localStorage.getItem("resultFormat") as ResultFormat ?? "Default"
  const [theme, setTheme] = useState<Theme>(savedTheme)
  const [resultFormat, setResultFormat] = useState<ResultFormat>(savedResultFormat)

  function saveTheme(theme: Theme) {
    setTheme(theme)
    localStorage.setItem("theme", theme)
  }

  function saveResultFormat(resultFormat: ResultFormat) {
    setResultFormat(resultFormat)
    localStorage.setItem("resultFormat", resultFormat)
  }

  useEffect(() => {
    document.querySelector('html')!.setAttribute('data-theme', theme);
  }, [theme]);

  return <GlobalContext.Provider value={{ theme, setTheme: saveTheme, resultFormat, setResultFormat: saveResultFormat }}>
    <RouterProvider router={router} />
  </GlobalContext.Provider>
}

export default App;