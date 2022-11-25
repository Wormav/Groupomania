import React, { useState } from "react";
import "./Form.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup);

export default function Form() {
  const [registerForm, setRegisterForm] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const schema = yup
    .object({
      pseudo: yup
        .string()
        .min(5, "Le pseudo doit contenir au moins 5 caractères !")
        .required("Pseudo requis !"),

      email: yup
        .string()
        .email("Veuillez entrer un email valide !")
        .required("Email requis !"),
      password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères !")
        .minLowercase(
          1,
          "Le mot de passe doit contenir au moins une lettre minuscule !"
        )
        .minUppercase(
          1,
          "Le mot de passe doit contenir au moins une lettre majuscule"
        )
        .minNumbers(1, "Le mot de passe doit contenir au moins un chiffe")
        .minSymbols(1, "Le mot de passe doit contenir au moins un symbole")
        .required("Le mot de passe est requis !"),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    if (registerForm) {
      axios
        .post("http://localhost:5001/api/auth/signup", {
          username: data.pseudo,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          const response = res.data;
          console.log(response); // a retirer
          setResponseMessage(response.message);
        });
    } else {
      axios
        .post("http://localhost:5001/api/auth/signin", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          const response = res.data;
          console.log(response); // a retirer
          setResponseMessage(response.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" placeholder="Pseudo" {...register("pseudo")} />
        {errors.pseudo && <span>{errors.pseudo.message}</span>}
      </div>

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
