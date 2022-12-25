import React, { useEffect } from "react";
import styles from "./Profil.module.scss";
import { FiMail } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";
import Follow from "./components/Follow/Follow";
import PostProfil from "./components/PostProfil/PostProfil";
import { useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";
import EditProfil from "./components/EditProfil/EditProfil";

export default function Profil() {
  const url = window.location.pathname;
  const userId = parseInt(url.substring(8));

  const [dataUser, setDataUser] = useState(null);
  const [dataPost, setDataPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const userIdCo = useSelector((state) => state.user).id_user;

  const getUser = async (id) => {
    axios
      .get(`${import.meta.env.VITE_URL}user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDataUser(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const getPostUser = async (id) => {
    axios
      .get(`${import.meta.env.VITE_URL}post/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDataPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser(userId);
    getPostUser(userId);
  }, [userId, openModal]);

  return (
    <>
      {dataUser ? (
        <div className={`${styles.container}`}>
          <img
            className={`${styles.picture}`}
            src={"../" + `${dataUser.user_picture}`}
          ></img>
          <div className={`${styles.card}`}>
            {userIdCo === userId ? (
              <BsPencil
                className={`${styles.pen}`}
                onClick={() => setOpenModal(true)}
              />
            ) : null}
            {openModal && (
              <EditProfil dataUser={dataUser} setOpenModal={setOpenModal} />
            )}

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
            <Follow id={userId} />
          </div>
          <div className={`${styles.post}`}>
            {dataPost &&
              dataPost

                .map((p) => (
                  <PostProfil
                    key={p.id_post}
                    data={p}
                    userId={userIdCo}
                    dataUser={dataUser}
                  />
                ))
                .reverse()}
          </div>
        </div>
      ) : (
        <>
          <h1>user not find</h1>
          {/* a remplacer par page 404 */}
        </>
      )}
    </>
  );
}
