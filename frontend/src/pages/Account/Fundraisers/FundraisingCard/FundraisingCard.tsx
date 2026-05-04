import styles from "./FundraisingCard.module.css";
import { Link } from "react-router";
import type { UsersFundraisingsResponse } from "@/api/accountApi.ts";

interface FundraisingCardProps {
  fundraising: UsersFundraisingsResponse;
  onAddUpdate: (id: number) => void;
  onEdit: (slug: string) => void;
  onClose: (id: number) => void;
}

const FundraisingCard = ({
  fundraising,
  onAddUpdate,
  onEdit,
  onClose,
}: FundraisingCardProps) => {
  const formattedDate = new Date(fundraising.startedAt).toLocaleDateString(
    "uk-UA",
  );

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "Активний";
      case "FINISHED":
        return "Завершений";
      case "CLOSED":
        return "Зупинений";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <span className={styles.label}>Назва збору</span>
          <Link
            to={`/fundraising/${fundraising.username}/${fundraising.slug}`}
            className={styles.titleLink}
          >
            {fundraising.title}
          </Link>

          <span className={styles.label}>Статус</span>
          <span className={styles.value}>
            {getStatusLabel(fundraising.status)}
          </span>

          <span className={styles.label}>Всього донатів</span>
          <span className={styles.value}>
            {fundraising.totalDonationsCount}
          </span>

          <span className={styles.label}>Зібрано коштів</span>
          <span className={`${styles.value} ${styles.balance}`}>
            {fundraising.balance} ₴
          </span>
        </div>

        <div className={styles.rightColumn}>
          <span className={styles.label}>Дата створення</span>
          <span className={styles.value}>{formattedDate}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.defaultButton}
          onClick={() => onAddUpdate(fundraising.id)}
        >
          Додати апдейт
        </button>
        <button
          className={styles.defaultButton}
          onClick={() => onEdit(fundraising.slug)}
        >
          Редагувати
        </button>
        <button
          className={styles.closeButton}
          onClick={() => onClose(fundraising.id)}
        >
          Закрити
        </button>
      </div>
    </div>
  );
};

export default FundraisingCard;
