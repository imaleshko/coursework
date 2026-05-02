import styles from "./Carousel.module.css";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

interface CarouselProps {
  imagesUrls: string[];
}

const Carousel = ({ imagesUrls }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!imagesUrls || imagesUrls.length === 0) {
    return <div>Зображення відсутні</div>;
  }

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {imagesUrls.map((url: string, index: number) => (
            <div className={styles.emblaSlide} key={index}>
              <img src={url} alt={"Зображення"} className={styles.image} />
            </div>
          ))}
        </div>
      </div>

      {imagesUrls.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={scrollPrev}
          >
            ❮
          </button>

          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={scrollNext}
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
