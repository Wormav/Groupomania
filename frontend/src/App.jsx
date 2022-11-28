import React from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { UidContex } from "./components/context/AppContext";
import Login from "./components/Login/Login";
import { store } from "./store/login.store";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get(`${import.meta.env.VITE_URL}auth/jwt`, {
          withCredentials: true,
        })
        .then((res) => {
          setUid(res.data);
          console.log(res);
        })
        .catch((err) => console.log("no token"));
    };
    fetchToken();
  }, []);

  return (
    <UidContex.Provider value={uid}>
      <Provider store={store}>
        <Login />
      </Provider>
    </UidContex.Provider>
  );
}

export default App;
