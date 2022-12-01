import React from "react";
import { useSelector } from "react-redux";

export default function Profil() {
  const dataUser = useSelector((state) => state.user);
  console.log(dataUser);
  return (
    <>
      {dataUser && (
        <>
          <h1>{dataUser.user_username}</h1>
          <img src={dataUser.user_picture}></img>
          <p>{dataUser.user_email}</p>
        </>
      )}
    </>
  );
}
