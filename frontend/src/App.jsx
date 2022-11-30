import React from "react";
import { useState } from "react";
import "./App.module.scss";
import { Provider } from "react-redux";
import Login from "./components/Login/Login";
import axios from "axios";
import { useEffect } from "react";
import { userStore } from "./store/user.store.jsx";
import RoutesApp from "./components/Routes/Routes";

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
        })
        .catch((err) => console.log("no token"));
    };
    fetchToken();
  }, []);

  return (
    <Provider store={userStore}>
      {uid ? (
        <>
          <RoutesApp uid={uid} />
        </>
      ) : (
        <Login />
      )}
    </Provider>
  );
}

export default App;
