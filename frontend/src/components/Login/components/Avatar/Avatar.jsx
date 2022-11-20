import React from "react";

import styles from "./Avatar.module.scss";

export default function Avatar() {
  return (
    <div className={`${styles.container}`}>
      <img className={`${styles.img}`} src="#" alt="#" />
    </div>
  );
}
