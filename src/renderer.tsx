import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
