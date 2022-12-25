import React, { useState } from "react";
import styles from "./EditProfil.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../../tools/yup.js";
import { RxCross2 } from "react-icons/rx";

export default function EditProfil({ dataUser, setOpenModal }) {
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const putProfil = async (data) => {
    const username = data.username;
    const bio = data.bio;
    const email = dataUser.user_email;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("email", email);
    formData.append("profil_image", selectedFile);

    await axios
      .put(`${import.meta.env.VITE_URL}user/${dataUser.id_user}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setOpenModal(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  return (
    <div className={`${styles.overlay}`}>
      <div className={`${styles.modalContainer}`}>
        <div className={`${styles.header}`}>
          <h1>Editez votre profil</h1>
          <RxCross2
            className={`${styles.cross}`}
            onClick={() => setOpenModal(false)}
          />
        </div>
        <form onSubmit={handleSubmit(putProfil)}>
          <input
            type="file"
            name="profil_image"
            onChange={changeHandler}
            className={`${styles.file}`}
          />
          <input
            type="text"
            {...register("username")}
            className={`${styles.username}`}
            defaultValue={dataUser.user_username}
          />
          <textarea
            type="text"
            {...register("bio")}
            className={`${styles.bio}`}
            defaultValue={dataUser.user_bio}
          />
          <button type="submit" className={`${styles.btn}`}>
            Valider
          </button>
          <button
            className={`${styles.btn__reverse}`}
            onClick={() => setOpenModal(false)}
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}
