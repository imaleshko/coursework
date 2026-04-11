import styles from "./Card.module.css";

interface CardProps {
  title: string;
  author: string;
  balance: number;
  goal: number;
}

export const Card = ({ title, author, balance, goal }: CardProps) => {
  const percentage = Math.min((balance / goal) * 100, 100);
  const width = `${percentage}%`;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.author}>
            <span className={styles.for}>for</span>
            {author}
          </p>
        </div>
        <div className={styles.progress}>
          <div className={styles.progressFill} style={{ width: width }}>
            <p className={styles.progressNumbers}>{`${balance}/${goal}`}</p>
          </div>
        </div>
      </div>

      <button className={styles.button}>Донат</button>
    </div>
  );
};
