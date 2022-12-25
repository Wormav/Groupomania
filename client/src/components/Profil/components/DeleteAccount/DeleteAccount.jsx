import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import styles from "./DeleteAccount.module.scss";

export default function DeleteAccount({ id }) {
  const removeCookie = (key) => {
    if (window == !"undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const deleteAccount = async () => {
    if (confirm("Voulez-vous supprimer votre compte ?")) {
      axios
        .delete(`${import.meta.env.VITE_URL}user/${id}`, {
          withCredentials: true,
        })
        .then((res) => removeCookie("jwt"))
        .catch((err) => console.log(err));

      window.location = "/";
    }
  };
  return (
    <button className={`${styles.btn}`} onClick={deleteAccount}>
      Supprimer mon compte
    </button>
  );
}
