import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setWidthScreen(window.innerWidth);
    };

    if (window.innerWidth > 500) {
      setToggleMenu(false);
    }

    window.addEventListener("resize", changeWidth);

    return () => {
      window.addEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav className={`${styles.navBar}`}>
      {(toggleMenu || widthScreen > 500) && (
        <ul className={`${styles.liste}`}>
          <li className={`${styles.items}`}>Acceuil</li>
          <li className={`${styles.items}`}>Profil</li>
          <li className={`${styles.items}`}>Message</li>
        </ul>
      )}
      <button onClick={toggleNavSmallScreen} className={`${styles.btn}`}>
        btn
      </button>
    </nav>
  );
}
