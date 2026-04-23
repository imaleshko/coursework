import { Logo } from "@/components/shared/Logo/Logo";
import styles from "./Header.module.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { accountApi } from "@/api/accountApi.ts";

export const Header = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => accountApi.getUser(),
    staleTime: Infinity,
  });

  return (
    <header className={styles.header}>
      <div>
        <Logo />
      </div>

      {data ? (
        <Link to="/account" className={styles.accountLink}>
          {data.username}
        </Link>
      ) : (
        <div className={styles.buttons}>
          <Link to="/login" className={styles.loginButton}>
            Увійти
          </Link>
          <Link to="/register" className={styles.regButton}>
            Створити акаунт
          </Link>
        </div>
      )}
    </header>
  );
};
