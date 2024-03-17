import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { GioiMonApp } from "./app";
// import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { rehydration, store } from "./redux-toolkit/configureStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
rehydration();
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <GioiMonApp />
    </HelmetProvider>
  </Provider>
);

reportWebVitals();
