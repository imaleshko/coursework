import { Logo } from "@/components/shared/Logo/Logo";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <Logo />
      </div>

      <div className={styles.buttons}>
        <button className={styles.loginButton}>Увійти</button>
        <button className={styles.regButton}>Створити акаунт</button>
      </div>
    </header>
  );
};
