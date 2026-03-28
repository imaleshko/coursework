import styles from "./Card.module.css";

export const Card = () => {
  const width = "50%";
  const collected = 6000;
  const goal = 6000;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>На щось</p>
          <p className={styles.author}>
            <span className={styles.for}>for</span>
            user_name
          </p>
        </div>

        <div className={styles.progress}>
          <div className={styles.progressFill} style={{ width: width }}>
            <p className={styles.progressNumbers}>{`${collected}/${goal}`}</p>
          </div>
        </div>
      </div>

      <button className={styles.button}>Донат</button>
    </div>
  );
};
