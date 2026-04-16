import { Logo } from "@/components/shared/Logo/Logo";
import styles from "./Header.module.css";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/authApi.ts";
import { Link } from "react-router";

export const Header = () => {
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: () => authApi.getUser(),
    staleTime: Infinity,
  });

  return (
    <header className={styles.header}>
      <div>
        <Logo />
      </div>

      {data ? (
        <Link to="/account">{data.username}</Link>
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
