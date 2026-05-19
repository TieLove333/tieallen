"use client";

import Button from "@/components/ui/Button";
import styles from "./service-breakdown.module.css";

type BreakdownItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ServiceBreakdownProps = {
  headline: string;
  subhead: string;
  items: BreakdownItem[];
  cta?: { label: string; href: string };
};

export default function ServiceBreakdown({ headline, subhead, items, cta }: ServiceBreakdownProps) {
  return (
    <section className={styles.frame}>
      <div className={styles.container}>
        {/* Top notch */}
        <div className={styles.topNotch} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.headline}>{headline}</h2>
            <p className={styles.subhead}>{subhead}</p>
          </div>
          {cta && (
            <div className={styles.headerRight}>
              <Button label={cta.label} href={cta.href} />
            </div>
          )}
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemHeader}>
                <div className={styles.itemIcon}>{item.icon}</div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
              </div>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
