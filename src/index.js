import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { hydrateRoot } from 'react-dom/client';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";


const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById('root'),
  // <Provider store={store}>
    <App />
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
