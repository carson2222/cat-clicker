import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Error from "./pages/Error";
import "./sass/main.scss";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <Home /> 
    <Game />*/}
    <RouterProvider router={router} />
  </Provider>
);
