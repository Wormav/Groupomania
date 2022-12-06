import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";
import { MdOutlineLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Navbar() {
  const dataUser = useSelector((state) => state.user);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const url = window.location.pathname;
  const userId = parseInt(url.substring(8));

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

  const clickImg = () => {
    window.location = "/";
  };

  const removeCookie = (key) => {
    if (window == !"undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios
      .get(`${import.meta.env.VITE_URL}auth/signout`, {
        withCredentials: true,
      })
      .then(() => {
        removeCookie("jwt");
      })
      .catch((err) => console.log(err));

    window.location = "/";
  };

  const reload = () => {
    if (dataUser.id_user !== userId) reload();
  };

  return (
    <nav className={`${styles.navBar}`}>
      <img
        onClick={clickImg}
        className={`${styles.navImg}`}
        src="/public/icons/icon.png"
        alt="icon groupomania"
      />
      {(toggleMenu || widthScreen > 500) && (
        <ul className={`${styles.liste}`}>
          <Link to="/" className={`${styles.items}`}>
            Accueil
          </Link>
          <Link
            onClick={reload}
            to={"/profil/" + `${dataUser.id_user}`}
            className={`${styles.items}`}
          >
            Profil
          </Link>
          <Link to="/message" className={`${styles.items}`}>
            Message
          </Link>
          <button className={`${styles.items}`} onClick={logout}>
            Déconnexion
          </button>
        </ul>
      )}
      <input
        type="text"
        placeholder="recherche"
        className={`${styles.navInput}`}
      ></input>
      <MdOutlineLogout className={`${styles.navLogout}`} onClick={logout} />
      <RxHamburgerMenu
        onClick={toggleNavSmallScreen}
        className={`${styles.btn}`}
      />
    </nav>
  );
}
