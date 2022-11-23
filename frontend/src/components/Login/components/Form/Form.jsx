import React, { useState } from "react";
import "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerForm } from "../../../../store/login.store.jsx";
import checkPasswordStrong from "../../../../tools/regexPassword";

export default function Form() {
  const formType = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [strongPassword, setStrongPassword] = useState(true);

  return (
    <form>
      {formType && (
        <div>
          <input type="text" placeholder="Pseudo" required />
        </div>
      )}
      <div>
        <input type="email" placeholder="email" required />
      </div>
      <div>
        <input
          onChange={(e) => {
            formType && checkPasswordStrong(e.target.value)
              ? setStrongPassword(true)
              : setStrongPassword(false);
          }}
          type="password"
          placeholder="mots de passe"
          required
        />
        {!strongPassword && formType && (
          <span>
            Le mot de passe doit contenir au moins 1 caractère spécial, 1
            majuscule, 1 minuscule, 1 chiffre et 8 caractères !
          </span>
        )}
      </div>
      <div>
        {formType ? (
          <button type="submit">S'inscrire</button>
        ) : (
          <button type="submit">Connexion</button>
        )}
        {formType ? (
          <a
            onClick={(e) => {
              dispatch(registerForm(formType));
            }}
          >
            Se connecter
          </a>
        ) : (
          <a
            onClick={(e) => {
              dispatch(registerForm(formType));
            }}
          >
            Crée un compte
          </a>
        )}
      </div>
    </form>
  );
}
