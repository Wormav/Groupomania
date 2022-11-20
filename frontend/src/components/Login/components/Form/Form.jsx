import React from "react";
import styles from "./Form.module.scss";
import "./Form.module.scss";

export default function Form() {
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
        <a>Crée un compte</a>
      </div>
    </form>
  );
}
