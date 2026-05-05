"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./services-page.module.css";

export function ServicesHero() {
  return (
    <div className={styles.hero}>
      <div style={{ gridColumn: 1, gridRow: 1 }}>
        <div className={styles.heroEyebrow}>Services</div>
        <h1 className={styles.heroTitle}>One craftsman. End-to-end.</h1>
      </div>
      <p className={styles.heroBody}>
        I bring strategy, design and development together for the creative
        execution of your vision into a world class digital experience.
      </p>
    </div>
  );
}

interface ServiceSectionProps {
  headline: string;
  href: string;
  body: string;
  capabilities: string[];
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function CapabilityRow({
  number,
  label,
  href,
}: {
  number: string;
  label: string;
  href: string;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current || !arrowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    arrowRef.current.style.left = `${e.clientX - rect.left}px`;
    arrowRef.current.style.top = `${e.clientY - rect.top}px`;
  };

  return (
    <Link
      ref={rowRef}
      href={href}
      className={styles.capabilityRow}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span
        ref={arrowRef}
        className={`${styles.rowArrow} ${hovered ? styles.rowArrowVisible : ""}`}
        aria-hidden="true"
      >
        <ArrowIcon />
      </span>
      <span className={styles.capabilityNumber}>{number}</span>
      <span className={styles.capabilityLabel}>{label}</span>
    </Link>
  );
}

export function ServiceSection({
  headline,
  href,
  body,
  capabilities,
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.serviceSection} ${inView ? styles.serviceSectionInView : ""}`}
    >
      <div
        className={`${styles.serviceBackdrop} ${inView ? styles.serviceBackdropInView : ""}`}
        aria-hidden="true"
      />
      <div className={styles.serviceContent}>
        <h2 className={styles.serviceHeadline}>{headline}</h2>
        <div className={styles.serviceGrid}>
          <p className={styles.serviceBody}>{body}</p>
          <div className={styles.capabilityList}>
            {capabilities.map((label, i) => (
              <CapabilityRow
                key={label}
                number={String(i + 1).padStart(2, "0")}
                label={label}
                href={href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
