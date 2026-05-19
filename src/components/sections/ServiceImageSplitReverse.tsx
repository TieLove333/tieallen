import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "./service-image-split-reverse.module.css";

type ServiceImageSplitReverseProps = {
  headline: string;
  body: string;
  checkpoints: string[];
  cta: { label: string; href: string };
  image: { src: string; alt: string };
};

export default function ServiceImageSplitReverse({
  headline,
  body,
  checkpoints,
  cta,
  image,
}: ServiceImageSplitReverseProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left - text */}
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

        {/* Right - image with bottom-left notch + right-center notch */}
        <div className={styles.imageWrap}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={styles.image}
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          {/* Bottom-left accent notch */}
          <div className={styles.accent} aria-hidden="true">
            <div className={`${styles.accentCorner} ${styles.accentTopLeft}`} />
            <div className={`${styles.accentCorner} ${styles.accentBottomRight}`} />
          </div>
          {/* Right-center accent notch */}
          <div className={styles.accentRight} aria-hidden="true">
            <div className={`${styles.accentRightCorner} ${styles.accentRightTop}`} />
            <div className={`${styles.accentRightCorner} ${styles.accentRightBottom}`} />
          </div>
        </div>

      </div>
    </section>
  );
}
