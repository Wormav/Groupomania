import React from "react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={`${styles.navBar}`}>
      <ul className={`${styles.liste}`}>
        <li className={`${styles.items}`}>Acceuil</li>
        <li className={`${styles.items}`}>Profil</li>
        <li className={`${styles.items}`}>Message</li>
      </ul>
      <button className={`${styles.btn}`}>btn</button>
    </nav>
  );
}
