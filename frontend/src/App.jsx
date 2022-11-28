import React from "react";
import { useState } from "react";
import "./App.css";
import { UidContex } from "./components/context/AppContext";
import Login from "./components/Login/Login";
import axios from "axios";
import { useEffect } from "react";
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
    <UidContex.Provider value={uid}>
      {uid ? <RoutesApp /> : <Login />}
    </UidContex.Provider>
  );
}

export default App;
