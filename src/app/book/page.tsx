import type { Metadata } from "next";
import styles from "./book.module.css";

export const metadata: Metadata = {
  title: "Book a Discovery Call | made by tie",
  description: "Schedule a quick 15-minute discovery call to discuss your brand, website, or custom software project.",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.benefitIcon}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function BookCallPage() {
  return (
    <main className={styles.page}>
      {/* ── Left: Sticky Intro Panel ── */}
      <section className={styles.introPanel}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Discovery Call
        </span>
        <h1 className={styles.title}>
          Let&apos;s map out
          <br />
          your project.
        </h1>
        <p className={styles.description}>
          No pitch decks, no salespeople, and no pressure. Just a direct, high-fidelity conversation to align on your vision, scope, and timeline.
        </p>

        <ul className={styles.benefitList}>
          <li className={styles.benefitItem}>
            <CheckIcon />
            <span>Review your goals, brand requirements, and target timeline.</span>
          </li>
          <li className={styles.benefitItem}>
            <CheckIcon />
            <span>Align on custom full-stack software &amp; platform architecture.</span>
          </li>
          <li className={styles.benefitItem}>
            <CheckIcon />
            <span>Walk through how the single craftsman delivery model accelerates your launch.</span>
          </li>
        </ul>
      </section>

      {/* ── Right: Scheduler Panel ── */}
      <section className={styles.bookingPanel}>
        <div className={styles.bookingContainer}>
          <iframe
            src="https://app.vizonos.com/book/madebytie"
            className={styles.bookingIframe}
            title="Book a discovery call"
            style={{ border: "none" }}
          />
        </div>
      </section>
    </main>
  );
}
