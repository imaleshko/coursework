import styles from "./Fundraisers.module.css";
import { useNavigate } from "react-router";

const Fundraisers = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("create");
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <div className={styles.header}>
          <button className={styles.createButton} onClick={handleCreateClick}>
            Додати новий збір
          </button>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.content}>
          <p className={styles.emptyState}>Зборів ще немає</p>
        </div>
      </section>
    </div>
  );
};

export default Fundraisers;
