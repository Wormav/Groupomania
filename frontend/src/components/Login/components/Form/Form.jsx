import React, { useState } from "react";
import "./Form.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../../tools/yup";

export default function Form() {
  const [registerForm, setRegisterForm] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  const onSubmit = async (data) => {
    if (registerForm) {
      axios
        .post(
          `${import.meta.env.VITE_URL}auth/signup`,
          {
            username: data.pseudo,
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          const response = res.data;
          setResponseMessage(response.message);
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            setResponseMessage("Erreur du serveur");
          } else {
            setResponseMessage(err.message);
          }
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_URL}auth/signin`,
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          const response = res.data;
          setResponseMessage(response.message);
          window.location = "/";
        })
        .catch((err) => {
          if (err.message === "Network Error") {
            setResponseMessage("Erreur du serveur");
          } else if (err.message === "Request failed with status code 500") {
            setResponseMessage(`Cette email n'existe pas`);
          } else {
            setResponseMessage(err.message);
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {registerForm && (
        <div>
          <input type="text" placeholder="Pseudo" {...register("pseudo")} />
          {errors.pseudo && <span>{errors.pseudo.message}</span>}
        </div>
      )}
      <div>
        <input type="text" placeholder="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
          type="password"
          placeholder="mots de passe"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
        {responseMessage && <span>{responseMessage}</span>}
      </div>
      <div>
        <button type="submit">
          {registerForm ? "S'inscrire" : "Se connecter"}
        </button>
        <a
          onClick={(e) => {
            setRegisterForm(!registerForm);
          }}
        >
          {registerForm ? "Se connecter" : "Crée un compte"}
        </a>
      </div>
    </form>
  );
}
