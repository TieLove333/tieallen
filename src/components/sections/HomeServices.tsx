"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import styles from "./home-services.module.css";

interface Service {
  number: string;
  label: string;
  description: string;
  href: string;
  image: string;
  imageHref: string;
  imagePosition?: string;
  imageScale?: number;
}

const SERVICES: Service[] = [
  {
    number: "01",
    label: "Web Design",
    description: "High-end websites built to convert. Every pixel, layout, and interaction is crafted with absolute precision.",
    href: "/services/web-design",
    image: "/projects/windward-tech-district/culture-screenshot.png",
    imageHref: "/work/bch-devcon",
    imagePosition: "center right",
    imageScale: 1.2,
  },
  {
    number: "02",
    label: "Development",
    description: "Custom platforms, SaaS products, and internal tools built to solve real problems. High performance, seamless user experiences, and a foundation built to scale.",
    href: "/services/development",
    image: "/assets/development.png",
    imageHref: "/work/servco-wholesale",
  },
  {
    number: "03",
    label: "Branding",
    description: "High-impact brand identities built from the ground up. Logo, color, type, and visual systems designed for consistency and market authority.",
    href: "/services/branding",
    image: "/projects/permissionless/pv-bcard-mockup.png",
    imageHref: "/work/expose-hair",
  },
  {
    number: "04",
    label: "CRM + Automation",
    description: "Intelligent systems and smart funnels that drive revenue in the background. Automated follow-ups, lead nurturing, and pipelines designed to convert.",
    href: "/services/crm-automation",
    image: "/assets/crm-v1.webp",
    imageScale: 1.15,
    imageHref: "/work/windward-tech-district",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function ServiceRow({ service, isActive, onHover }: {
  service: Service;
  isActive: boolean;
  onHover: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current || !arrowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    arrowRef.current.style.left = `${e.clientX - rect.left}px`;
    arrowRef.current.style.top = `${e.clientY - rect.top}px`;
  };

  return (
    <div
      ref={rowRef}
      className={`${styles.serviceRow} ${isActive ? styles.serviceRowActive : ""}`}
      onMouseEnter={() => { onHover(); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor arrow */}
      <div
        ref={arrowRef}
        className={`${styles.rowArrow} ${hovered ? styles.rowArrowVisible : ""}`}
        aria-hidden="true"
      >
        <ArrowIcon />
      </div>

      {/* Single row: number | title+description stacked | image */}
      <div className={styles.rowInner}>
        <span className={styles.serviceNumber}>{service.number}</span>

        {/* Title and description stacked - NO gap between them */}
        <Link href={service.href} className={styles.serviceContent}>
          <span className={styles.serviceName}>{service.label}</span>
          <span className={styles.serviceDescription}>{service.description}</span>
        </Link>

        {/* Notched image card - fades in when active */}
        <div className={styles.serviceImageCard}>
          {/* Actual image - clipped separately */}
          <div className={styles.serviceImageClip}>
            <img
              src={service.image}
              alt={service.label}
              className={styles.serviceImageImg}
              style={{
                objectPosition: service.imagePosition ?? "center",
                transform: service.imageScale ? `scale(${service.imageScale})` : undefined,
              }}
            />
          </div>
          {/* Top-left accent notch */}
          <div className={styles.imageAccent} aria-hidden="true" />
          {/* Bottom-right CTA notch */}
          <div className={styles.imageCtaNotch}>
            <Button label="Learn More" href={service.href} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomeServices() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (!isMobile) return;

    const handleScroll = () => {
      if (!listRef.current) return;
      const rows = listRef.current.querySelectorAll(`.${styles.serviceRow}`);
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - rowCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // If the row is reasonably close to the center, activate it
      if (minDistance < 200) {
        setActiveIndex(closestIndex);
      } else {
        setActiveIndex(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesFrame}>
        <div className={styles.servicesHeader}>
          <div className={styles.servicesHeaderLeft}>
            <span className={styles.servicesEyebrow}>Services</span>
            <h2 className={styles.servicesTitle}>my expertise</h2>
          </div>
          <p className={styles.servicesDesc}>
            I bring visions to life for ambitious startups, enterprise teams and moonshots.
          </p>
        </div>

        <div
          ref={listRef}
          className={styles.servicesList}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.label}
              service={service}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
