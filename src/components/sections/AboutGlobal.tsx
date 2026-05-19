"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import styles from "./about-global.module.css";

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use a square size based on the largest dimension to ensure 1:1
    const resize = () => {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      canvas.width = size * 2;
      canvas.height = size * 2;
      ctx.scale(2, 2);
    };

    resize();
    window.addEventListener('resize', resize);

    let rotation = 0;
    const dots: { x: number; y: number; z: number }[] = [];
    const numDots = 400;

    for (let i = 0; i < numDots; i++) {
      const phi = Math.acos(-1 + (2 * i) / numDots);
      const theta = Math.sqrt(numDots * Math.PI) * phi;
      dots.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      });
    }

    const arcs = Array.from({ length: 5 }, () => ({
      startDot: Math.floor(Math.random() * numDots),
      endDot: Math.floor(Math.random() * numDots),
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.01,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      const size = canvas.width / 2;
      ctx.clearRect(0, 0, size, size);
      
      rotation += 0.002;
      const radius = size * 0.45;
      const centerX = size / 2;
      const centerY = size / 2;

      dots.forEach((dot) => {
        const x1 = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
        const z1 = dot.z * Math.cos(rotation) + dot.x * Math.sin(rotation);
        
        if (z1 > 0) {
          const x = centerX + x1 * radius;
          const y = centerY + dot.y * radius;
          const opacity = Math.max(0.1, z1);
          
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 143, 107, ${opacity * 0.6})`;
          ctx.fill();
        }
      });

      arcs.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) {
          arc.progress = 0;
          arc.startDot = Math.floor(Math.random() * numDots);
          arc.endDot = Math.floor(Math.random() * numDots);
        }

        const d1 = dots[arc.startDot];
        const d2 = dots[arc.endDot];

        const x1 = (d1.x * Math.cos(rotation) - d1.z * Math.sin(rotation)) * radius + centerX;
        const y1 = d1.y * radius + centerY;
        const z1 = d1.z * Math.cos(rotation) + d1.x * Math.sin(rotation);

        const x2 = (d2.x * Math.cos(rotation) - d2.z * Math.sin(rotation)) * radius + centerX;
        const y2 = d2.y * radius + centerY;
        const z2 = d2.z * Math.cos(rotation) + d2.x * Math.sin(rotation);

        if (z1 > 0 && z2 > 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(centerX, centerY - radius * 1.2, x2, y2);
          ctx.strokeStyle = `rgba(255, 143, 107, ${0.2 * (1 - Math.abs(arc.progress - 0.5) * 2)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    }

    const animation = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.globeCanvas} />;
}

export default function AboutGlobal() {
  return (
    <section className={styles.globalSection}>
      <div className={styles.globalInner}>
        {/* Full-width Title */}
        <div className={styles.titleWrapper}>
          <h2 className={styles.globalTitle}>
            I’m lo<span>•</span>cal glo<span>•</span>bal
          </h2>
        </div>

        {/* content Grid */}
        <div className={styles.globalGrid}>
          {/* Left Side: Narrative & Stats */}
          <div className={styles.narrativeArea}>
            <p className={styles.mainNarrative}>
              I have been fortunate to work with companies of all sizes from <strong>big enterprises to one-man startups</strong>, from all around the world.
            </p>
            
            <p className={styles.locationSummary}>
              Clients over <span className={styles.accent}>3</span> continents, <span className={styles.accent}>5</span> countries and <span className={styles.accent}>20</span> cities.
            </p>

            <div className={styles.buttonWrapper}>
              <Button label="Start a project" href="/start" />
            </div>
          </div>

          {/* Right Side: Large Globe */}
          <div className={styles.visualArea}>
            <div className={styles.globeContainer}>
              <Globe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
