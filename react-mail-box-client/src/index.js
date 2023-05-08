import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
/*
React Bootstrap Configuration
*/
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import '../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);