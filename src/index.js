import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "reset-css";
import App from "./Components/App/App";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
