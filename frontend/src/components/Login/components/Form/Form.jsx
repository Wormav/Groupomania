import React from "react";

export default function Form() {
  return (
    <form className="form">
      <div className="textbox">
        <input type="email" placeholder="test placeholder" />
        <span className="material-symbols-outlined"></span>
      </div>
      <div className="textbox">
        <input type="password" placeholder="test placeholder" />
        <span className="material-symbols-outlined"></span>
      </div>
      <button type="submit">Test btn</button>
      <a href="#">test link</a>
    </form>
  );
}
