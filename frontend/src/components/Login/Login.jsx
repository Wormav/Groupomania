import React from "react";
import Avatar from "./components/avatar/Avatar";
import Form from "./components/Form/Form";

import styles from "./Login.module.scss";

export default function Login() {
  return (
    <div className={`${styles.container}`}>
      <Avatar />
      <h2>test h2</h2>
      <h3>test h3</h3>
      <Form />
    </div>
  );
}
