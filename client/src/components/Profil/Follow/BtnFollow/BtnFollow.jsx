import React from "react";
import { useSelector } from "react-redux";
import styles from "./BtnFollow.module.scss";

export default function BtnFollow({ follower }) {
  const userId = useSelector((state) => state.user).id_user;
  const checkIfIdFollow = follower.includes(userId);

  return (
    <>
      {follower && (
        <button className={`${styles.btn}`}>
          {checkIfIdFollow ? "Ne plus suivre" : "Suivre"}
        </button>
      )}
    </>
  );
}
