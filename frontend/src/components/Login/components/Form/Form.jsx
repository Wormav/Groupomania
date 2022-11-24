import React, { useState } from "react";
import "./Form.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup);

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

export default function Form() {
  const [registerForm, setRegisterForm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
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
      {registerForm ? (
        <div>
          <input
            type="password"
            placeholder="mots de passe"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
      ) : (
        <div>
          <input type="password" placeholder="mots de passe" />
        </div>
      )}

      <div>
        {registerForm ? (
          <button type="submit">S'inscrire</button>
        ) : (
          <button type="submit">Connexion</button>
        )}
        {registerForm ? (
          <a
            onClick={(e) => {
              setRegisterForm(false);
            }}
          >
            Se connecter
          </a>
        ) : (
          <a
            onClick={(e) => {
              setRegisterForm(true);
            }}
          >
            Crée un compte
          </a>
        )}
      </div>
    </form>
  );
}
