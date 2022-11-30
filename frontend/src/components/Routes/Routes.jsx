import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./Routes.module.scss";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userIdDataFunction } from "../../store/user.store";

export default function RoutesApp({ uid }) {
  const dispatch = useDispatch();

  const getUserData = async (userId, userIdDataFunction) => {
    await axios
      .get(`${import.meta.env.VITE_URL}user/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(userIdDataFunction(res.data[0]));
      })
      .catch((err) => console.log(err));
  };

  getUserData(uid, userIdDataFunction);

  return (
    <div className={`${styles.divRouteContainer}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>route</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}
