import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./app/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
     <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
 
);
