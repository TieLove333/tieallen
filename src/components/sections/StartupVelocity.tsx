"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./startup-velocity.module.css";

export default function StartupVelocity() {
  const [inView, setInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the grid is visible
        rootMargin: "50px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: "2+ Weeks",
      title: "Time To Market",
      desc: "Agencies take months. I operate on startup timelines. Rapid iteration and deployment without sacrificing high-end results.",
    },
    {
      value: "1:1",
      title: "Zero Handoffs",
      desc: "One craftsman. End-to-end. I design the brand, design the interface, and build the systems. Working directly with me means zero lost context, fast feedback loops, and streamlined progress.",
    },
    {
      value: "Async",
      title: "Signal Over Noise",
      desc: "No weekly alignment meetings that waste your morning. I operate on deep work and asynchronous execution.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>• The Standard</span>
          <h2 className={styles.title}>Delivering at startup velocity.</h2>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${styles.statBlock} ${inView ? styles.statBlockInView : ""}`}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <p className={styles.statDesc}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
