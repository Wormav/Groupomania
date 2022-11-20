import React from "react";

import styles from "./Avatar.module.scss";
import "./Avatar.module.scss";

export default function Avatar() {
  return (
    <div className={`${styles.container}`}>
      <img src="/icon.png" />
    </div>
  );
}
