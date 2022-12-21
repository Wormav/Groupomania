import React from "react";
import styles from "./FormComment.module.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../../../../../../tools/yup";
import { useSelector } from "react-redux";

export default function FormComment({
  postId,
  setUpdateComment,
  updateComment,
}) {
  const userCo = useSelector((state) => state.user);

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const addComment = async (data) => {
    axios
      .post(
        `${import.meta.env.VITE_URL}comment/${postId}`,
        {
          content: data.content,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUpdateComment(!updateComment);
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleSubmit(addComment)}>
        <div className={`${styles.container_input}`}>
          <img
            src={userCo.user_picture}
            alt="photo de profil"
            className={`${styles.pp}`}
          />
          <input
            type="text"
            {...register("content")}
            className={`${styles.input}`}
          />
        </div>
        <div className={`${styles.container_btn}`}>
          <button type="submit" className={`${styles.btn}`}>
            Commenter
          </button>
        </div>
      </form>
    </div>
  );
}
