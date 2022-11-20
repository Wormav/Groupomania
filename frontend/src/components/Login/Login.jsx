import React from "react";
import Avatar from "./components/avatar/Avatar";
import Form from "./components/Form/Form";
import styles from "./Login.module.scss";
import "./Login.module.scss";

export default function Login() {
  return (
    <div className={`${styles.container}`}>
      <Avatar />
      <h2>Se connecter</h2>
      <h3>Bienvenue sur Groupomania</h3>
      <Form />
    </div>
  );
}
