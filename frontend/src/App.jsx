import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Login from "./components/Login/Login";
import { store } from "./store/login.store";

function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
