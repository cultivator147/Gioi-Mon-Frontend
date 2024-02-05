import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { GioiMonApp } from "./app";
// import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";
import persistStore from 'redux-persist/es/persistStore';
import { configureAppStore } from "./redux-toolkit/configureStore";
import { HelmetProvider } from 'react-helmet-async';

export const store = configureAppStore();
export const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <HelmetProvider>
    <React.StrictMode>
      <GioiMonApp />
    </React.StrictMode>
    </HelmetProvider>

  </Provider>
);

reportWebVitals();
