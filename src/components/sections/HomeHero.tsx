"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import styles from "./home-hero.module.css";

export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.5;
    video.currentTime = 6;
    // After the first loop, reset to beginning
    const handleLoop = () => { video.currentTime = 0; video.play(); };
    video.addEventListener("ended", handleLoop);
    return () => video.removeEventListener("ended", handleLoop);
  }, []);

  return (
    <section className={styles.homeHero}>
      <div className={styles.homeHeroFrame}>
        <div className={styles.homeHeroCard}>
          {/* Background video */}
          <div className={styles.homeHeroImage} aria-hidden="true">
            <video
              ref={videoRef}
              className={styles.heroVideo}
              autoPlay
              muted
              playsInline
            >
              <source src="/assets/home-intro.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Stepped white overlay with headline */}
          <div className={styles.homeHeroOverlay}>
            {/* Corner notches for overlay */}
            <div className={`${styles.overlayCorner} ${styles.overlayBottomLeft}`} aria-hidden="true" />
            <div className={`${styles.overlayCorner} ${styles.overlayTopRight}`} aria-hidden="true" />

            <h1 className={styles.homeHeroTitle}>
              <span className={`${styles.titleLine} ${styles.titleLineBold}`}>Concept to scale.</span>
              <span className={styles.titleLine}>
                One craftsman. Brand, web, and product - end-to-end, at startup velocity.
              </span>
            </h1>

            {/* Buttons */}
            <div className={styles.homeHeroButtons}>
              <Button label="See my work" href="/work" />
              <a href="/start" className={styles.textButton}>
                Start<span className={styles.mobileHide}> your project</span>
                <svg className={styles.textButtonArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Accent notch - bottom-right */}
          <div className={styles.homeHeroAccent} aria-hidden="true">
            {/* Corner notches for accent */}
            <div className={`${styles.accentCorner} ${styles.accentTopRight}`} aria-hidden="true" />
            <div className={`${styles.accentCorner} ${styles.accentBottomLeft}`} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
