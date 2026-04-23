import styles from "./Profile.module.css";
import DataField from "@/components/Account/Field/DataField.tsx";
import PasswordField from "@/components/Account/Field/PasswordField.tsx";
import useGetUser from "@/hooks/useGetUser.ts";
import useChangeEmail from "@/hooks/useChangeEmail.ts";
import useChangePassword from "@/hooks/useChangePassword.ts";
import useChangeUsername from "@/hooks/useChangeUsername.ts";

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
            onSave={(newValue, onSuccess) =>
              changeEmail({ email: newValue }, { onSuccess })
            }
            isPending={isEmailPending}
            serverError={emailError}
            validate={(val) => (!val.includes("@") ? "Некоректна пошта" : null)}
          />
          <DataField
            label="Ім'я"
            value={user.username}
            type="text"
            onSave={(newValue, onSuccess) =>
              changeUsername({ username: newValue }, { onSuccess })
            }
            isPending={isUsernamePending}
            serverError={usernameError}
            validate={(val) => (val.length < 3 ? "Мінімум 3 символи" : null)}
          />
          <PasswordField
            onSave={(oldPass, newPass, onSuccess) =>
              changePassword(
                { oldPassword: oldPass, newPassword: newPass },
                { onSuccess },
              )
            }
            // 🟢 ДОДАНО
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
