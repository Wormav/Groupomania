import React, { useState } from "react";
import styles from "./NewPost.module.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../../tools/yup.js";

import axios from "axios";

export default function NewPost({ updatePost, setUpdatePost, setYoutubeUrl }) {
  const dataUser = useSelector((state) => state.user);

  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const listenIfYoutube = (e) => {
    if (e.target.value.includes("youtube.com")) {
      setYoutubeUrl(e.target.value);
    }
  };

  const addPost = async (data) => {
    const content = data.content;
    const formData = new FormData();
    formData.append("content", content);
    formData.append("post_image", selectedFile);

    await axios
      .post(`${import.meta.env.VITE_URL}post`, formData, {
        withCredentials: true,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
    setUpdatePost(!updatePost);
    reset();
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
            onChange={(e) => listenIfYoutube(e)}
          />
        </div>
        <div className={`${styles.container_btn}`}>
          <input
            type="file"
            name="post_image"
            onChange={changeHandler}
            className={`${styles.container_imgInput}`}
          />

          <button type="submit" className={`${styles.btn}`}>
            Poster
          </button>
        </div>
      </form>
    </div>
  );
}
