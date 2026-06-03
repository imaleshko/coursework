import styles from "./FundraiserCard.module.css";
import { Link } from "react-router";
import type {
  FundraiserStatus,
  UserFundraiserResponse,
} from "@/pages/Account/accountApi.ts";
import { useState } from "react";

interface FundraiserCardProps {
  fundraiser: UserFundraiserResponse;
  onAddUpdate: (id: number) => void;
  onEdit: (id: number) => void;
  onClose: (id: number) => void;
}

const FundraiserCard = ({
  fundraiser,
  onAddUpdate,
  onEdit,
  onClose,
}: FundraiserCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("uk-UA");
  };

  const getStatusLabel = (status: FundraiserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "Активний";
      case "CLOSED":
        return "Закритий";
    }
  };

  const [withdrawal, setWithdrawal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const onWithdrawal = () => {
    setWithdrawal(true);
  };

  const onCloseWithdrawal = () => {
    setWithdrawal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.row}>
            <span>Назва збору</span>
            <Link
              to={`/fundraiser/${fundraiser.username}/${fundraiser.slug}`}
              className={styles.titleLink}
            >
              {fundraiser.title}
            </Link>
          </div>

          <div className={styles.row}>
            <span>Статус</span>
            <span>{getStatusLabel(fundraiser.status)}</span>
          </div>

          <div className={styles.row}>
            <span>Всього донатів</span>
            <span>{fundraiser.totalDonationsCount}</span>
          </div>

          <div className={styles.row}>
            <span>Зібрано коштів</span>
            <span className={styles.balance}>{fundraiser.balance} ₴</span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.dateBlock}>
            <span>Дата створення</span>
            <span>{formatDate(fundraiser.startedAt)}</span>
          </div>

          {fundraiser.closedAt && (
            <div className={styles.dateBlock}>
              <span>Дата закриття</span>
              <span>{formatDate(fundraiser.closedAt)}</span>
            </div>
          )}
        </div>
      </div>

      {fundraiser.status === "ACTIVE" && (
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => onAddUpdate(fundraiser.id)}
          >
            Додати оновлення
          </button>
          {fundraiser.totalDonationsCount === 0 && (
            <button
              className={styles.button}
              onClick={() => onEdit(fundraiser.id)}
            >
              Редагувати
            </button>
          )}
          <button
            className={styles.closeButton}
            onClick={() => onClose(fundraiser.id)}
          >
            Закрити
          </button>
        </div>
      )}

      {fundraiser.status === "CLOSED" && cardNumber === "" && (
        <div className={styles.actions}>
          {!withdrawal ? (
            <button className={styles.button} onClick={onWithdrawal}>
              Вивести кошти
            </button>
          ) : (
            <div className={styles.withdrawalForm}>
              <input
                type="text"
                className={styles.cardInput}
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <button className={styles.button} onClick={onCloseWithdrawal}>
                Подати заявку
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FundraiserCard;
