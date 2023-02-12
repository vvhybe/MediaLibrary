import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import Router from './Router';

// State Store:
import { store } from './utils/store';

//CSS
import "./styles/index.scss";

localStorage.setItem("lang","en");
const root = ReactDOM.createRoot(document.querySelector('#container'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);


