import React from "react";
import "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerForm } from "../../../../store/login.store.jsx";

export default function Form() {
  const formType = useSelector((state) => state.login);
  const dispatch = useDispatch();

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
        <input type="password" placeholder="mots de passe" required />
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
