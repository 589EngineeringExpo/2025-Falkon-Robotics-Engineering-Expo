
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Homepage";
import Map from "./pages/Map.js";
import Booths from "./pages/Booths.js";
import Tours from "./pages/Tours.js";
import Donate from "./pages/Donate.js";
import Event from "./pages/Event.js";

import Navbar from "./components/Navbar.js";
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
        {
        path: "/Map",
        element: <Map />,
      },
            {
        path: "/Booths",
        element: <Booths/>,
      },
        {
        path: "/Tours",
        element: <Tours/>,
      },
            {
        path: "/Donate",
        element: <Donate />,
      },
        {
        path: "/Event",
        element: <Event/>,
      }
      

 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);