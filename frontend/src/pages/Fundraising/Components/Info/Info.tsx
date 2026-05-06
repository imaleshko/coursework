import styles from "./Info.module.css";
import type { GetFundraisingResponse } from "@/api/fundraisersApi.ts";

interface InfoProps {
  fundraising: GetFundraisingResponse;
}

const Info = ({ fundraising }: InfoProps) => {
  const targetPercentage =
    fundraising.goal && fundraising.goal > 0
      ? Math.min(
          Math.round((fundraising.balance / fundraising.goal) * 100),
          100,
        )
      : 0;

  const startDate = new Date(fundraising.startedAt).toLocaleDateString("uk-UA");
  const endDate = fundraising.endDate
    ? new Date(fundraising.endDate).toLocaleDateString("uk-UA")
    : null;
  const endedAt = fundraising.endedAt
    ? new Date(fundraising.endedAt).toLocaleDateString("uk-UA")
    : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <div className={styles.avatarWrapper}>
          <img
            className={styles.avatar}
            src={fundraising.authorAvatarUrl}
            alt={"Фото"}
          />
        </div>
        <span className={styles.username}>{fundraising.authorUsername}</span>
      </div>

      <div className={styles.dates}>
        <p>Збір розпочато: {startDate}</p>
        {endDate && <p>Збір іде до: {endDate}</p>}
        {endedAt && <p>Збір завершено: {endedAt}</p>}
      </div>

      <div className={styles.progress}>
        <div
          className={styles.progressCircle}
          style={{
            background: `conic-gradient(var(--yellow-color) ${targetPercentage}%, transparent 0deg)`,
          }}
        >
          <div className={styles.progressCircle}>
            <span className={styles.percentageText}>{targetPercentage}%</span>
            <span className={styles.balanceText}>
              {fundraising.balance} /{" "}
              {fundraising.goal ? fundraising.goal : "∞"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
