import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./Routes.module.scss";
import Navbar from "../Navbar/Navbar";

export default function RoutesApp() {
  return (
    <div className={`${styles.divRouteContainer}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>route</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}
