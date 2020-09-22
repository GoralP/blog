import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import RouterBlog from "./utils/router";
import "antd/dist/antd.css";

function App() {
  return (
    <Provider store={store}>
      <RouterBlog></RouterBlog>
      <ToastContainer position="top-center" autoClose={5000} />
    </Provider>
  );
}

export default App;
