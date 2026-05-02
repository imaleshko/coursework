import styles from "./Fundraising.module.css";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fundraisingApi } from "@/api/fundraisingApi.ts";
import Carousel from "@/pages/Fundraising/Components/Carousel/Carousel.tsx";

export const Fundraising = () => {
  const { username, slug } = useParams();

  const { data: fundraising } = useQuery({
    queryKey: ["fundraising", username, slug],
    queryFn: () => fundraisingApi.getByUsernameAndSlug(username!, slug!),
  });

  if (!fundraising) return null;

  return (
    <div className={styles.wrapper}>
      <Link to={`/fundraising/${username}/${slug}`} className={styles.title}>
        {fundraising.title}
      </Link>

      <div className={styles.divider}></div>

      <div className={styles.topSection}>
        <div className={styles.carouselContainer}>
          <Carousel imagesUrls={fundraising.imagesUrl} />
        </div>

        <div className={styles.infoContainer}></div>
      </div>
    </div>
  );
};
