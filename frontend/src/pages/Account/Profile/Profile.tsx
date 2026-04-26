import styles from "./Profile.module.css";
import DataField from "@/components/Account/Field/DataField.tsx";
import PasswordField from "@/components/Account/Field/PasswordField.tsx";
import useGetUser from "@/hooks/useGetUser.ts";
import useChangeEmail from "@/hooks/useChangeEmail.ts";
import useChangePassword from "@/hooks/useChangePassword.ts";
import useChangeUsername from "@/hooks/useChangeUsername.ts";

const validateEmail = (value: string) =>
  !value.includes("@") ? "Некоректна пошта" : null;

const validateUsername = (value: string) =>
  value.length < 3 ? "Мінімум 3 символи" : null;

const Profile = () => {
  const { data: user } = useGetUser();
  const {
    changeEmail,
    isPending: isEmailPending,
    error: emailError,
  } = useChangeEmail();
  const {
    changeUsername,
    isPending: isUsernamePending,
    error: usernameError,
  } = useChangeUsername();
  const {
    changePassword,
    isPending: isPasswordPending,
    error: passwordError,
  } = useChangePassword();

  const handleEmailSave = (newValue: string, onSuccess: () => void) => {
    changeEmail({ email: newValue }, { onSuccess });
  };

  const handleUsernameSave = (newValue: string, onSuccess: () => void) => {
    changeUsername({ username: newValue }, { onSuccess });
  };

  const handlePasswordSave = (
    oldPassword: string,
    newPassword: string,
    onSuccess: () => void,
  ) => {
    changePassword({ oldPassword, newPassword }, { onSuccess });
  };

  if (!user) return null;

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <h2 className={styles.cardTitle}>Персональні дані</h2>

        <div className={styles.formGroup}>
          <DataField
            label="Електронна адреса"
            value={user.email}
            type="email"
            onSave={handleEmailSave}
            isPending={isEmailPending}
            serverError={emailError}
            validate={validateEmail}
          />
          <DataField
            label="Ім'я"
            value={user.username}
            type="text"
            onSave={handleUsernameSave}
            isPending={isUsernamePending}
            serverError={usernameError}
            validate={validateUsername}
          />
          <PasswordField
            onSave={handlePasswordSave}
            isPending={isPasswordPending}
            serverError={passwordError}
          />
        </div>
        <button className={styles.deleteButton}>Видалити акаунт</button>
      </section>
    </div>
  );
};

export default Profile;
