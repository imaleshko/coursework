import styles from "./Account.module.css";
import { NavLink, Outlet } from "react-router";

const Account = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Мої дані
        </NavLink>

        <NavLink
          to="donations"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Мої донати
        </NavLink>

        <NavLink
          to="fundraisers"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Мої збори
        </NavLink>
      </div>

      <div className={styles.mainArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
