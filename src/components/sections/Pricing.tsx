import type { ReactNode } from "react";
import styles from "./pricing.module.css";

interface PricingTier {
  exclusive?: boolean;
  title: string;
  price: string;
  priceSuffix?: string;
  description: ReactNode;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: ReactNode;
}

function CircleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

const tiers: PricingTier[] = [
  {
    title: "Custom Project",
    price: "$10k+",
    priceSuffix: "one-time",
    description: (
      <>
        <strong>I bring your vision to life. There are no limits.</strong> Brand design, UI/UX, high-end web design, marketing funnels and custom platforms from the ground up.
      </>
    ),
    features: [
      "Full project lifecycle strategy",
      "High-end Design & Branding",
      "Advanced UI & UX",
      "Custom full-stack development",
      "Technical SEO & optimization",
      "CRM, Funnels & Automation",
    ],
    ctaLabel: "Book a discovery call",
    ctaHref: "/start",
    icon: <CircleIcon />,
  },
  {
    exclusive: true,
    title: "Unlimited Retainer",
    price: "$5k+",
    priceSuffix: "monthly",
    description: (
      <>
        <strong>Available exclusively to partners who have completed a Foundation project.</strong> Like having an entire premium design and development department at your fingertips.
      </>
    ),
    features: [
      "One request at a time",
      "Deliverable every 2-3 days",
      "Continuous feature development",
      "Conversion rate optimization",
      "Ongoing brand asset creation",
      "Pause or cancel anytime",
    ],
    ctaLabel: "Apply for retainer",
    ctaHref: "/start",
    icon: <CircleIcon />,
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Pricing() {
  return (
    <section className={styles.pricingFrame} id="pricing">
      <div className={styles.pricing}>
        {/* Top Notch UI */}
        <div className={styles.topNotch} aria-hidden="true" />

        <div className={styles.pricingHeader}>
          <span className={styles.eyebrow}>Pricing</span>
          <h2 className={styles.pricingTitle}>
            <span className={styles.pricingTitleBold}>Straightforward</span>
            <span className={styles.pricingTitleAccent}>pricing.</span>
          </h2>
          <p className={styles.pricingSubtitle}>
            Start with a custom buildout. Long-term partners unlock ongoing
            design and development on an exclusive monthly retainer.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {tiers.map((tier) => (
            <article
              key={tier.title}
              className={`${styles.card} ${tier.exclusive ? styles.cardExclusive : styles.cardFoundation}`}
            >
                <div className={styles.iconSquare} aria-hidden="true">{tier.icon}</div>
                <div className={styles.cardBody}>
                  {/* Notch cutout + concave ears rounding the inside corners */}
                  <div className={styles.notchCutout} aria-hidden="true" />
                  <div className={`${styles.notchEar} ${styles.notchEarBottomLeft}`} aria-hidden="true" />
                  <div className={`${styles.notchEar} ${styles.notchEarTopRight}`} aria-hidden="true" />

                  {tier.exclusive && (
                    <span className={styles.exclusiveBadge}>Exclusive</span>
                  )}

                  <div className={styles.titleArea}>
                    <h3 className={styles.cardTitle}>
                      {tier.title.split(' ').map((word, i) => (
                        <span key={i}>{word}</span>
                      ))}
                    </h3>
                  </div>

                  <div className={styles.cardHeader}>
                    <div className={styles.priceRow}>
                      <span className={styles.price}>{tier.price}</span>
                      {tier.priceSuffix && (
                        <span className={styles.priceSuffix}>{tier.priceSuffix}</span>
                      )}
                    </div>
                    <p className={styles.cardDescription}>{tier.description}</p>
                  </div>

                  <div className={styles.divider} aria-hidden="true" />

                  <ul className={styles.featureList}>
                    {tier.features.map((feature) => (
                      <li key={feature} className={styles.feature}>
                        <span className={styles.featureIcon}>
                          <CheckIcon />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={tier.ctaHref} className={styles.cta}>
                    <span>{tier.ctaLabel}</span>
                    <ArrowIcon />
                  </a>
                </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
