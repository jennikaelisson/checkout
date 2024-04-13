import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Confirmation from './pages/Confirmation.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import UserProvider from './context/UserContext.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />
  },
  
  {
    path: "/",
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
     <RouterProvider router={router} /></UserProvider>
  </React.StrictMode>,
)
