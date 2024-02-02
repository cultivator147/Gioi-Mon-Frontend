import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { GioiMonApp } from "./app";
// import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";
import persistStore from 'redux-persist/es/persistStore';
import { configureAppStore } from "./redux-toolkit/configureStore";

const store = configureAppStore();
export const persistor = persistStore(store);

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
