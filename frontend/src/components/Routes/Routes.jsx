import React from "react";
import { Routes, Route } from "react-router-dom";
import Avatar from "../Login/components/avatar/Avatar";

export default function RoutesApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Avatar />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </>
  );
}
