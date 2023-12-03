import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { GioiMonApp } from "./app";
import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <GioiMonApp />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
