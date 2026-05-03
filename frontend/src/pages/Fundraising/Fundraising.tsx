import styles from "./Fundraising.module.css";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fundraisingApi } from "@/api/fundraisingApi.ts";
import Carousel from "@/pages/Fundraising/Components/Carousel/Carousel.tsx";
import Info from "@/pages/Fundraising/Components/Info/Info.tsx";
import DonationForm from "@/pages/Fundraising/Components/DonationForm/DonationForm.tsx";
import Description from "@/pages/Fundraising/Components/Description/Description.tsx";
import { updateApi } from "@/api/updateApi.ts";
import Update from "@/pages/Fundraising/Components/Update/Update.tsx";

export const Fundraising = () => {
  const { username, slug } = useParams();

  const { data: fundraising } = useQuery({
    queryKey: ["fundraising", username, slug],
    queryFn: () => fundraisingApi.getByUsernameAndSlug(username!, slug!),
  });

  const { data: updates } = useQuery({
    queryKey: ["fundraising-updates", fundraising?.id],
    queryFn: () => updateApi.getUpdates(fundraising!.id),
    enabled: !!fundraising?.id,
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
        <div className={styles.infoContainer}>
          <Info fundraising={fundraising} />
        </div>{" "}
      </div>

      <DonationForm fundraisingId={fundraising.id} />

      <Description description={fundraising.description} />

      {updates?.map((update) => (
        <Update
          key={update.id}
          title={update.title}
          content={update.message}
          createdAt={update.createdAt}
        />
      ))}
    </div>
  );
};
