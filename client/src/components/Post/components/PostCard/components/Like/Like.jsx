import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Like.module.scss";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Like({ postId }) {
  const userIdCo = useSelector((state) => state.user).id_user;

  const [arrayLikes, setArrayLikes] = useState(null);
  const [updateLikes, setUpdateLikes] = useState(false);

  const getLike = async () => {
    axios
      .get(`${import.meta.env.VITE_URL}like/getlike/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        const array = [];
        array.push(res.data.map((i) => i.like_user_id));
        setArrayLikes(array[0]);
      })
      .catch((err) => console.log(err));
  };

  const addLike = async () => {
    axios
      .post(
        `${import.meta.env.VITE_URL}like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUpdateLikes(!updateLikes);
      })
      .catch((err) => console.log(err));
  };

  const removeLike = async () => {
    axios
      .delete(`${import.meta.env.VITE_URL}like/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUpdateLikes(!updateLikes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLike();
  }, [updateLikes]);

  return (
    <div className={styles.container}>
      {arrayLikes ? (
        <>
          <span>{arrayLikes.length}</span>
          {arrayLikes.includes(userIdCo) ? (
            <AiTwotoneLike
              className={`${styles.icon} ${styles.icon__active}`}
              onClick={removeLike}
            />
          ) : (
            <AiOutlineLike className={`${styles.icon}`} onClick={addLike} />
          )}
        </>
      ) : null}
    </div>
  );
}
