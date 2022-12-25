import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from "./SearchBar.module.scss";

import ItemsSearchBar from "./ItemsSearchBar/ItemsSearchBar";

export default function SearchBar() {
  const [value, setValue] = useState(null);
  const [result, setResult] = useState(null);
  const [resultFilter, setResultFilter] = useState(null);

  const onChange = async (e) => {
    if (e.target.value.length > 0) {
      setValue(e.target.value);
      axios
        .get(`${import.meta.env.VITE_URL}user`, {
          withCredentials: true,
        })
        .then((res) => setResult(res.data))
        .catch((err) => console.log(err));

      if (result && value) {
        const resultSearch = result.filter((r) => {
          return r.user_username.toLowerCase().includes(value.toLowerCase());
        });
        setResultFilter(resultSearch);
      }
    } else {
      setValue(null);
      setResultFilter(null);
    }
  };

  const clickToUser = (id) => {
    console.log(id);
    useNavigate("/profil/" + `${id}`);
  };

  return (
    <div className={`${styles.container}`}>
      <input
        type="text"
        placeholder="Rechercher"
        className={`${styles.input}`}
        onChange={(e) => onChange(e)}
      />
      <div className={`${styles.container__result}`}>
        {resultFilter &&
          resultFilter.map((r) => <ItemsSearchBar data={r} key={r.id_user} />)}
      </div>
    </div>
  );
}
