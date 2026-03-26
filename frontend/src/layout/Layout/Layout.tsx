import styles from "./Layout.module.css";
import { Outlet } from "react-router";
import { Header } from "@/layout/Header/Header";
import { Footer } from "@/layout/Footer/Footer";

export const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
