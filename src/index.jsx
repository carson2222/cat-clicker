import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./sass/main.scss";

// redux imp
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <Home /> */}
    <Game />
  </Provider>
);
