import React from "react";
import styles from "./ItemsSearchBar.module.scss";

export default function ItemsSearchBar({ data }) {
  const clickToUser = () => {
    window.location = "/profil/" + `${data.id_user}`;
  };

  return (
    <div className={`${styles.container__items}`} onClick={clickToUser}>
      <img
        className={`${styles.pp}`}
        src={data.user_picture}
        alt="photo de profil"
      />
      <span className={`${styles.name}`}>{data.user_username}</span>
    </div>
  );
}
