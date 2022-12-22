import React, { useEffect } from "react";
import styles from "./Filter.module.scss";

export default function Filter({ filterValue, setFilterValue }) {
  const handleChange = () => {
    setFilterValue(!filterValue);
  };

  useEffect(() => {
    console.log(filterValue);
  }, [filterValue]);

  return (
    <div className={`${styles.container}`}>
      <select
        name="filter"
        id="filter"
        onChange={handleChange}
        className={`${styles.input}`}
      >
        <option value="Récent">Récent</option>
        <option value="Meillieur post">Meillieur</option>
      </select>
    </div>
  );
}
