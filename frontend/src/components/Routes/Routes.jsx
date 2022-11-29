import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Routes.module.scss";
import Navbar from "../Navbar/Navbar";

export default function RoutesApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>route</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
}
