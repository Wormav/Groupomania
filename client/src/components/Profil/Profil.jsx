import React from "react";
import { useSelector } from "react-redux";
import styles from "./Profil.module.scss";
import { FiMail } from "react-icons/fi";

export default function Profil() {
  const dataUser = useSelector((state) => state.user);
  console.log(dataUser);
  return (
    <>
      {dataUser && (
        <div className={`${styles.container}`}>
          <img
            className={`${styles.picture}`}
            src={dataUser.user_picture}
          ></img>
          <div className={`${styles.card}`}>
            <h1 className={`${styles.pseudo}`}>{dataUser.user_username}</h1>
            <div className={`${styles.email_container}`}>
              <FiMail className={`${styles.email_icon}`} />
              <a
                href={`mailto: ` + `${dataUser.user_email}`}
                className={`${styles.email}`}
              >
                {dataUser.user_email}
              </a>
            </div>
            <div className={`${styles.bio_container}`}>
              <div className={`${styles.bio_title_container}`}>
                <h2 className={`${styles.bio_title}`}>À propos</h2>
                <div className={`${styles.bio_title_element}`}></div>
              </div>
              <p className={`${styles.bio}`}>{dataUser.user_bio}</p>
            </div>
            <div className={`${styles.btn_container}`}>
              <button className={`${styles.btn}`}>Suivre</button>
              <button className={`${styles.btn_reverse}`}>Message</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
