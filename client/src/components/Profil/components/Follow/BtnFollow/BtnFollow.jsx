import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./BtnFollow.module.scss";

export default function BtnFollow({
  follower,
  id,
  changeInFollow,
  setChangeInFollow,
}) {
  const userId = useSelector((state) => state.user).id_user;
  const checkIfIdFollow = follower.includes(userId);

  const addOrRemoveFollow = async () => {
    if (checkIfIdFollow) {
      axios
        .delete(`${import.meta.env.VITE_URL}follow/${id}`, {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      setChangeInFollow(!changeInFollow);
    } else {
      axios
        .post(
          `${import.meta.env.VITE_URL}follow/${id}`, // pas besoin de data
          {},
          {
            withCredentials: true,
          }
        )
        .catch((err) => console.log(err));
      setChangeInFollow(!changeInFollow);
    }
  };

  return (
    <>
      {follower && (
        <button className={`${styles.btn}`} onClick={addOrRemoveFollow}>
          {checkIfIdFollow ? "Ne plus suivre" : "Suivre"}
        </button>
      )}
    </>
  );
}
