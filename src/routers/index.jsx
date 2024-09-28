import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/Login";
import HomePage from "../views/Home";
import BaseLayout from "../views/BaseLayout";
import Toastify from "toastify-js";
import Detail from "../views/PostDetail";
const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage url={url} />,
  },

  {
    path: "/detail/:id",
    element: <Detail url={url} />,
  },
]);
export default router;
