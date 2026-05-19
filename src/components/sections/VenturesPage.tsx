"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "./ventures-page.module.css";

export function VenturesHero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroTitle}>
        Building the future. One venture at a time.
      </h1>
      <p className={styles.heroBody}>
        From enterprise platforms to digital storytelling, I focus on building products that push boundaries and solve complex problems.
      </p>
    </div>
  );
}

interface VentureSectionProps {
  label: string;
  headline: string;
  body: string;
  image?: string;
  info: { label: string; value: string; href?: string }[];
  primaryCTA?: { label: string; href: string; external?: boolean };
  secondaryCTA?: { label: string; href: string; external?: boolean };
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function InfoRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current || !arrowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    arrowRef.current.style.left = `${e.clientX - rect.left}px`;
    arrowRef.current.style.top = `${e.clientY - rect.top}px`;
  };

  const Content = (
    <>
      <span
        ref={arrowRef}
        className={`${styles.rowArrow} ${hovered ? styles.rowArrowVisible : ""}`}
        aria-hidden="true"
      >
        <ArrowIcon />
      </span>
      <span className={styles.infoNumber}>{label}</span>
      <span className={styles.infoLabel}>{value}</span>
    </>
  );

  if (href) {
    return (
      <Link
        ref={rowRef}
        href={href}
        className={styles.infoRow}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {Content}
      </Link>
    );
  }

  return (
    <div className={styles.infoRow}>
      {Content}
    </div>
  );
}

export function VentureSection({ label, headline, body, info, image, primaryCTA, secondaryCTA }: VentureSectionProps) {
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
      className={`${styles.ventureSection} ${inView ? styles.ventureSectionInView : ""}`}
    >
      <div className={`${styles.ventureBackdrop} ${inView ? styles.ventureBackdropInView : ""}`} aria-hidden="true" />
      <div className={styles.ventureContent}>
        <span className={styles.ventureLabel}>{label}</span>
        <h2 className={styles.ventureHeadline}>{headline}</h2>
        <div className={styles.ventureGrid}>
          <div className={styles.ventureLeft}>
            <p className={styles.ventureBody}>{body}</p>
            
            <div className={styles.ctaGroup}>
              {primaryCTA && (
                <Button 
                  label={primaryCTA.label} 
                  href={primaryCTA.href} 
                  target={primaryCTA.external ? "_blank" : undefined}
                />
              )}
              {secondaryCTA && (
                <Link 
                  href={secondaryCTA.href} 
                  className={styles.secondaryCTA}
                  target={secondaryCTA.external ? "_blank" : undefined}
                >
                  {secondaryCTA.label}
                  <ArrowIcon />
                </Link>
              )}
            </div>

            <div className={styles.infoList}>
              {info.map((item, i) => (
                <InfoRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  href={item.href}
                />
              ))}
            </div>
          </div>
          {image && (
            <div className={styles.ventureImageWrap}>
              <Image
                src={image}
                alt={headline}
                fill
                className={styles.ventureImage}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
