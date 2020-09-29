import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import RouterBlog from "./utils/router";
import "antd/dist/antd.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        {" "}
        <RouterBlog />
      </Router>
      <ToastContainer position="top-center" autoClose={5000} />
    </Provider>
  );
}

export default App;
