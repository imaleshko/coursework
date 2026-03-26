import styles from "./Home.module.css";
import { useState } from "react";
import { Card } from "@/components/Home/Card/Card";

export const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div className={styles.wrapper}>
      <p className={styles.text1}>Шукай</p>
      <div className={styles.searchGroup}>
        <input
          className={styles.input}
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.button}>Пошук</button>
      </div>
      <p className={styles.text2}>або переглянь нові</p>

      <div className={styles.cards}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
