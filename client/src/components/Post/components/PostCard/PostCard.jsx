import React from "react";
import styles from "./PostCard.module.scss";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function PostCard({ data }) {
  const navigate = useNavigate();

  const ppClick = () => {
    navigate(`/profil/${data.id_user}`);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.header}`}>
        <img
          src={data.user_picture}
          alt="photo de profil"
          className={`${styles.pp}`}
          onClick={ppClick}
        />
        <h1>{data.user_username}</h1>
      </div>
      <p className={`${styles.content}`}>
        {data.post_content}
        {data.post_picture && (
          <img
            src={data.post_picture}
            alt="image du post"
            className={`${styles.content_img}`}
          ></img>
        )}
      </p>
      <div className={`${styles.comment_container}`}>
        <div className={`${styles.comment_bar}`}></div>
        <div className={`${styles.comment_main}`}>
          <p>
            100 <AiOutlineLike />
          </p>
          <p>
            100 <span>commentaires</span>
          </p>
        </div>
      </div>
    </div>
  );
}
