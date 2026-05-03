import styles from "./DonationForm.module.css";
import { type ChangeEvent, type SubmitEventHandler, useState } from "react";
import { useInitDonation } from "@/pages/Fundraising/Components/DonationForm/useInitDonation.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

interface DonationFormProps {
  fundraisingId: number;
}

const DonationForm = ({ fundraisingId }: DonationFormProps) => {
  const [data, setData] = useState({
    amount: "",
    name: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();
  const { username, slug } = useParams();
  const { initDonation, isPending, error } = useInitDonation({
    onSuccessPayment: () => {
      alert("Дякуємо за донат!");
      setData({ amount: "", name: "", message: "" });

      void queryClient.invalidateQueries({
        queryKey: ["fundraising", username, slug],
      });
      void queryClient.invalidateQueries({
        queryKey: ["fundraising-donations", fundraisingId],
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const validationErrors: Record<string, string> = {};

    if (!data.amount || Number(data.amount) <= 1) {
      validationErrors.amount = "Сума має бути більшою за 1";
    }
    if (data.name.trim().length === 0) {
      validationErrors.name = "Ім'я не може бути порожнім";
    }

    return validationErrors;
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    initDonation({
      fundraisingId,
      amount: Number(data.amount),
      name: data.name.trim(),
      message: data.message.trim(),
    });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <input
              type="number"
              placeholder="Сума"
              className={styles.input}
              name="amount"
              value={data.amount}
              onChange={handleChange}
              min="1"
            />
            {errors.amount && (
              <span className={styles.errorText}>{errors.amount}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Відображуване ім'я"
              className={styles.input}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Повідомлення"
              className={styles.input}
              name="message"
              value={data.message}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className={styles.serverError}>{error}</div>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isPending}
        >
          {isPending ? "Обробка" : "Здійснити донат"}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
