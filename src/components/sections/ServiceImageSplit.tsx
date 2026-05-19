import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "./service-image-split.module.css";

type ServiceImageSplitProps = {
  headline: string;
  body: string;
  checkpoints: string[];
  cta: { label: string; href: string };
  image: { src: string; alt: string };
};

export default function ServiceImageSplit({
  headline,
  body,
  checkpoints,
  cta,
  image,
}: ServiceImageSplitProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left - image with bottom-right notch */}
        <div className={styles.imageWrap}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={styles.image}
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          {/* Bottom-right accent notch */}
          <div className={styles.accent} aria-hidden="true">
            <div className={`${styles.accentCorner} ${styles.accentTopRight}`} />
            <div className={`${styles.accentCorner} ${styles.accentBottomLeft}`} />
          </div>
          {/* Left-center accent notch */}
          <div className={styles.accentLeft} aria-hidden="true">
            <div className={`${styles.accentLeftCorner} ${styles.accentLeftTop}`} />
            <div className={`${styles.accentLeftCorner} ${styles.accentLeftBottom}`} />
          </div>
        </div>

        {/* Right - text */}
        <div className={styles.content}>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.body}>{body}</p>

          <ul className={styles.checkpoints}>
            {checkpoints.map((item) => (
              <li key={item} className={styles.checkpoint}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="var(--brand-orange)" />
                    <polyline
                      points="5.5,10.5 8.5,13.5 14.5,7.5"
                      stroke="#111111"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className={styles.ctaWrap}>
            <Button label={cta.label} href={cta.href} />
          </div>
        </div>

      </div>
    </section>
  );
}
