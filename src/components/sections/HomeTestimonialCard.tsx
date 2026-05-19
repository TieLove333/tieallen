"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import styles from "./home-testimonial-card.module.css";

const IMAGES = [
  "/projects/bch-devcon/IMG_3254.jpg",
  "/projects/bch-devcon/IMG_3255.jpg",
  "/projects/bch-devcon/IMG_3256.jpg",
  "/projects/bch-devcon/IMG_3257.jpg",
  "/projects/bch-devcon/IMG_3258.jpg",
];

interface HomeTestimonialCardProps {
  title: string;
  subtitle: string;
  image: string;
  objectPosition?: string;
  overlay?: boolean;
  images?: string[];
  logo?: string;
}

export default function HomeTestimonialCard({
  title,
  subtitle,
  objectPosition = "center center",
  overlay = true,
  images,
  logo,
}: HomeTestimonialCardProps) {
  const resolvedImages = images ?? IMAGES;
  const resolvedLogo = logo ?? "/projects/bch-devcon/bch-devcon-logo_3.png";
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % resolvedImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [resolvedImages.length]);

  return (
    <section className={styles.loveHero}>
      <div className={styles.loveHeroFrame}>
        <div className={styles.loveHeroCard}>
          <img
            src={resolvedImages[current]}
            alt=""
            className={styles.loveHeroImage}
            style={{ objectPosition }}
          />

          {overlay && <div className={styles.overlay} />}

          {/* Top white strip */}
          <div className={styles.loveHeroStrip} aria-hidden="true" />

          {/* Title tab: Right-aligned */}
          <div className={styles.loveHeroTab}>
            <div className={styles.loveHeroContent}>
              <img src={resolvedLogo} alt="BCH Devcon" className={styles.loveHeroLogo} />
              {subtitle && <p className={styles.loveHeroSubtitle}>{subtitle}</p>}
            </div>
          </div>

          {/* Accent notch: Bottom-left */}
          <div className={styles.loveHeroAccent} aria-hidden="true" />

          {/* CTA notch: Bottom-right */}
          <div className={styles.ctaNotch}>
            <Button label="View Project" href="/work/bch-devcon" size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
