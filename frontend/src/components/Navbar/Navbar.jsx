import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { BiLogOut } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";

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
      <img
        className={`${styles.navImg}`}
        src="/icon.png"
        alt="icon groupomania"
      />
      {(toggleMenu || widthScreen > 500) && (
        <ul className={`${styles.liste}`}>
          <li className={`${styles.items}`}>Acceuil</li>
          <li className={`${styles.items}`}>Profil</li>
          <li className={`${styles.items}`}>Message</li>
          <li className={`${styles.items}`}>Déconnexion</li>
        </ul>
      )}
      <input
        type="text"
        placeholder="recherche"
        className={`${styles.navInput}`}
      ></input>
      <BiLogOut className={`${styles.navLogout}`} />
      <RxHamburgerMenu
        onClick={toggleNavSmallScreen}
        className={`${styles.btn}`}
      />
    </nav>
  );
}
