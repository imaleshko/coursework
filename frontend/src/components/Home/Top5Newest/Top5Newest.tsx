import styles from "./Top5Newest.module.css";
import { Card } from "@/components/Home/Card/Card.tsx";
import useNewest from "@/hooks/useNewest.ts";

const Top5Newest = () => {
  const { data: newest = [] } = useNewest();

  return (
    <div className={styles.wrapper}>
      {newest.map((fundraising) => (
        <Card
          key={fundraising.id}
          title={fundraising.title}
          author={fundraising.author}
          balance={fundraising.balance}
          goal={fundraising.goal}
        />
      ))}
    </div>
  );
};

export default Top5Newest;
