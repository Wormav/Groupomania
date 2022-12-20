import React, { useEffect, useState } from "react";
import styles from "./BtnComment.module.scss";
import axios from "axios";

export default function BtnComment({ postId }) {
  const [commentData, setCommentData] = useState(null);

  console.log(postId);

  const getComment = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}comment/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className={styles.container}>
      {commentData ? (
        <>
          <span className={styles.element}>{commentData.length}</span>
          <p className={styles.element}>Commentaires</p>
        </>
      ) : null}
    </div>
  );
}
