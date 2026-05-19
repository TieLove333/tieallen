import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "./about-bio.module.css";

export default function AboutBio({ bio }: { bio?: any }) {
  if (!bio) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* Left - text */}
        <div className={styles.content}>
          <h2 className={styles.headline} data-edit="bio.headline">
            {bio.headline}
          </h2>
          <p className={styles.body} data-edit="bio.body">
            {bio.body}
          </p>

          <div className={styles.ctaWrap}>
            <Button label="About Me" href="/about" />
          </div>
        </div>

        {/* Right - image with bottom-left notch + right-center notch */}
        <div className={styles.imageWrap}>
          <Image
            src={bio.image}
            alt="Tie Allen"
            fill
            className={styles.image}
            sizes="(max-width: 860px) 100vw, 40vw"
            data-edit-image="bio.image"
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
