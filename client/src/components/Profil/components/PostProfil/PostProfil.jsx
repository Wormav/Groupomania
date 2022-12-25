import React from "react";
import styles from "./PostProfil.module.scss";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Like from "../../../../components/Post/components/PostCard/components/Like/Like";

export default function PostCard({ data, userId, dataUser }) {
  const deletePost = async () => {
    if (confirm("Voulez-vous supprimer ce post ?")) {
      axios
        .delete(`${import.meta.env.VITE_URL}post/${data.id_post}`, {
          withCredentials: true,
        })
        .then((res) => setPost(res.data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.header}`}>
        <img
          src={"../" + `${dataUser.user_picture}`}
          alt="photo de profil"
          className={`${styles.pp}`}
        />
        <h1>{dataUser.user_username}</h1>
        {dataUser.id_user === userId ? (
          <>
            <RxCross2 className={`${styles.cross}`} onClick={deletePost} />
          </>
        ) : null}
      </div>
      <p className={`${styles.content}`}>
        {data.post_content}
        {data.post_picture && (
          <img
            src={"../" + `${data.post_picture}`}
            alt="image du post"
            className={`${styles.content_img}`}
          ></img>
        )}
      </p>
      <div className={`${styles.comment_container}`}>
        <div className={`${styles.comment_bar}`}></div>
        <div className={`${styles.comment_main}`}>
          <Like postId={data.id_post} />
        </div>
      </div>
    </div>
  );
}
