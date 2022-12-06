import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./Routes.module.scss";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userIdDataFunction } from "../../store/user.store";
import Profil from "../Profil/Profil";
import { useEffect } from "react";

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

  useEffect(() => {
    getUserData(uid, userIdDataFunction);
  }, [uid]);

  const dataUser = useSelector((state) => state.user);

  return (
    <div className={`${styles.divRouteContainer}`}>
      {dataUser && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<div>route</div>} />
            <Route path="/profil/:id" element={<Profil />}></Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </>
      )}
    </div>
  );
}
