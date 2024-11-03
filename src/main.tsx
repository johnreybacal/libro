import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookDetail from './BookDetail.tsx';

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


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
