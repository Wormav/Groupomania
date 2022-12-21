import React, { useEffect, useState } from "react";
import styles from "./CommentCard.module.scss";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

export default function Comment({
  userCo,
  dataComment,
  setUpdateComment,
  updateComment,
}) {
  const [dataUser, setDataUser] = useState(null);

  const getUser = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}user/${dataComment.comment_user_id}`, {
        withCredentials: true,
      })
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  };

  const deleteComment = async () => {
    axios
      .delete(`${import.meta.env.VITE_URL}comment/${dataComment.id_comment}`, {
        withCredentials: true,
      })
      .then((res) => setUpdateComment(!updateComment))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {dataUser && (
        <div className={`${styles.container}`}>
          <div className={`${styles.container__head}`}>
            <img
              src={dataUser[0].user_picture}
              alt="photo de profil"
              className={`${styles.pp}`}
            />
            <span className={`${styles.name}`}>
              {dataUser[0].user_username}
            </span>
            {dataComment.comment_user_id === userCo ? (
              <>
                <RxCross2
                  className={`${styles.cross}`}
                  onClick={deleteComment}
                />
              </>
            ) : null}
          </div>
          <p className={`${styles.content}`}>{dataComment.comment_content}</p>
        </div>
      )}
    </>
  );
}
