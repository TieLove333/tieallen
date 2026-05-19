"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./introduction.module.css";

function StarIcon({ starRef }: { starRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={starRef} className={styles.starIcon}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="100%" height="100%">
        <path d="M 11.8 2 A 0.2 0.2 0 0 1 12.2 2 L 12.2 8.8 A 3 3 0 0 0 15.2 11.8 L 22 11.8 A 0.2 0.2 0 0 1 22 12.2 L 15.2 12.2 A 3 3 0 0 0 12.2 15.2 L 12.2 22 A 0.2 0.2 0 0 1 11.8 22 L 11.8 15.2 A 3 3 0 0 0 8.8 12.2 L 2 12.2 A 0.2 0.2 0 0 1 2 11.8 L 8.8 11.8 A 3 3 0 0 0 11.8 8.8 Z" fill="currentColor"/>
      </svg>
    </div>
  );
}

export default function Introduction() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (starRef.current) {
        // Start smaller (0.6) and grow up to 1.4
        const scale = 0.6 + (window.scrollY * 0.0005); 
        starRef.current.style.transform = `scale(${Math.min(scale, 1.4)})`; 
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.introFrame} id="about">
      <div className={styles.introInner}>
        {/* Eyebrow */}
        <div className={styles.eyebrowWrapper}>
          <div className={styles.eyebrowLine} />
          <span className={styles.eyebrow}>ABOUT ME</span>
          <div className={styles.eyebrowLine} />
        </div>

        {/* Large Statement */}
        <h2 className={styles.statement}>
          <span className={styles.statementBold}>I design and build premium brands, websites, applications and funnels from end-to-end.</span>
        </h2>

        {/* Separator Icon */}
        <div className={styles.starWrapper}>
          <StarIcon starRef={starRef} />
        </div>

        {/* Description Text */}
        <p className={styles.description}>
          With over 18 years of industry expertise, I specialize in transforming chaos into order—elevating ambitious ideas into high-impact brands and world-class digital experiences.
        </p>

        {/* Call to Action */}
        <div className={styles.ctaWrapper}>
          <Link href="#projects" className={styles.outlineButton}>
            SEE MY WORK
          </Link>
        </div>
      </div>
    </section>
  );
}
