import React, { useState } from "react";
import styles from "./Form.module.scss";
import "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerForm } from "../../../../redux";

export default function Form() {
  const formType = useSelector((state) => state.login);
  const dispatch = useDispatch();

  return (
    <form>
      <div>
        <input type="email" placeholder=" email" required />
      </div>
      <div>
        <input type="password" placeholder=" mots de passe" required />
      </div>
      <div>
        <button type="submit">Connexion</button>
        <a
          onClick={(e) => {
            dispatch(registerForm(formType));
          }}
        >
          Crée un compte
        </a>
      </div>
    </form>
  );
}
