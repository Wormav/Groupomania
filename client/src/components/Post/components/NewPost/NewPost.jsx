import React from "react";
import styles from "./NewPost.module.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../../tools/yup.js";
import axios from "axios";

export default function NewPost({ updatePost, setUpdatePost }) {
  const dataUser = useSelector((state) => state.user);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  const addPost = async (data) => {
    axios
      .post(
        `${import.meta.env.VITE_URL}post`,
        {
          content: data.content,
          post_image: data.file,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.log(err));
    setUpdatePost(!updatePost);
  };

  return (
    <div className={`${styles.container}`}>
      <form onSubmit={handleSubmit(addPost)}>
        <div className={`${styles.container_input}`}>
          <img
            src={"../" + `${dataUser.user_picture}`}
            alt="photo de profil de l'utilisateur"
            className={`${styles.pp}`}
          />
          <input
            className={`${styles.input}`}
            type="text"
            {...register("content")}
          />
        </div>
        <div className={`${styles.container_btn}`}>
          <input
            type="file"
            className={`${styles.images}`}
            {...register("file")}
          />
          <button type="submit" className={`${styles.btn}`}>
            Poster
          </button>
        </div>
      </form>
    </div>
  );
}
