import styles from "../Auth.module.css";
import { type ChangeEvent, type SubmitEventHandler, useState } from "react";
import { Link } from "react-router";
import useLogin from "@/hooks/useLogin.ts";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { login, isPending, isError, error } = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    login({
      email: data.email.trim(),
      password: data.password.trim(),
    });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>Вхід</h2>
        {isError && error && (
          <p className={`${styles.errorText} ${styles.serverError}`}>{error}</p>
        )}
        <div className={styles.inputs}>
          <input
            type="email"
            placeholder="Email"
            className={styles.formInput}
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            className={styles.formInput}
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button
            type={"submit"}
            className={styles.submitButton}
            disabled={isPending}
          >
            Увійти
          </button>
        </div>
        <div className={styles.loginLink}>
          <p>Не маєте акаунта?</p>
          <Link to="/register">Реєстрація</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
