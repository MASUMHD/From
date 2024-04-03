import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './components/Root/Root';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import LogIn from './components/LogIn';
import SingIn from './components/SingIn';
import Hero from './components/Hero';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
      element: <Home/>
      },
      {
        path: "/login",
        element: <LogIn/>
      },
      {
        path: "/singin",
        element: <SingIn/>
      },
      {
        path: "/hero",
        element: <Hero/>
      }

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
