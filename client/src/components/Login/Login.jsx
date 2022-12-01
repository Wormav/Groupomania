import React from "react";
import Form from "./components/Form/Form";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.loginTitle}`}>Se connecter</h2>
      <h3 className={`${styles.loginText}`}>Bienvenue sur Groupomania</h3>
      <Form />
    </div>
  );
}
