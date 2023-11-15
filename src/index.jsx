import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Error from "./pages/Error";
import Auth from "./pages/Auth";
import "./sass/main.scss";
// react tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux imp
import { store } from "./store";
import { Provider } from "react-redux";

// react router
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "game",
        element: <Game />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

// Supabase authentication

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <Home /> 
    <Game />*/}
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      limit={3}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </Provider>
);
