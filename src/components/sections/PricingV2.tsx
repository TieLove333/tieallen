"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./pricing-v2.module.css";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const tabs = [
  {
    id: "website",
    label: "Website",
    title: "Web Design & Dev",
    timeline: "3–4 Weeks",
    price: "$10,000+",
    description: "Marketing websites built to convert. Strategy, design, and development in one shop — so the brand voice carries through every pixel.",
    features: [
      "Strategy, wireframes, and UX mapping",
      "High-fidelity visual design and art direction",
      "Responsive frontend, custom-built",
      "Subtle motion and micro-interactions",
      "SEO foundation and analytics setup",
    ],
  },
  {
    id: "branding",
    label: "Branding",
    title: "Brand Identity",
    timeline: "2–3 Weeks",
    price: "$7,500+",
    description: "A complete visual identity system. Logo, type, color, and the rules that make the brand hold up everywhere you put it.",
    features: [
      "Custom brand strategy & discovery",
      "Premium logo design, marks & variations",
      "Curated color systems & premium typography",
      "Brand style guidelines & system application",
      "Social media, business cards & collateral assets",
    ],
  },
  {
    id: "funnel",
    label: "Funnel",
    title: "Marketing Funnel",
    timeline: "2–3 Weeks",
    price: "$7,500+",
    description: "End-to-end acquisition systems. The page, the sequences, the CRM, and the analytics — wired together so traffic turns into booked calls without you touching it.",
    features: [
      "Landing page built for one conversion",
      "Email/SMS sequences and follow-up automation",
      "Full CRM setup (Vizon OS integrated)",
      "Conversion tracking and reporting",
      "Copy and conversion strategy",
    ],
  },
  {
    id: "saas",
    label: "Product Dev",
    title: "Product Development",
    timeline: "Ongoing / Custom",
    price: "$25,000+",
    description: "Full-stack product builds. From first wireframe to deployed platform — design, database, auth, and the user experience that holds it all together.",
    features: [
      "Product strategy and database architecture",
      "High-fidelity SaaS design and screen mapping",
      "Full-stack development (Next.js, modern frameworks)",
      "Authentication, user management, dashboards",
      "Iteration cycles and scaling support",
    ],
  },
];

const capabilities = [
  "Brand Identity",
  "Web Design & Dev",
  "UI Design",
  "Development",
  "CRM & Automations",
  "Conversion Funnels",
  "Product Design",
];

type RetainerTier = {
  badge: string;
  subtitle: string;
  description: string;
  price: string;
  suffix: string;
  isCustom: boolean;
};

function getRetainerTier(tasks: number): RetainerTier {
  if (tasks === 1) return {
    badge: "Standard",
    subtitle: "One active task at a time",
    description: "Steady, ongoing execution. One craftsman embedded with your team for whatever's next — design, dev, brand, all of it.",
    price: "$7,199",
    suffix: "/ month",
    isCustom: false,
  };
  if (tasks === 2) return {
    badge: "Accelerated",
    subtitle: "Two active tasks in parallel",
    description: "Multiple workstreams running in parallel. Brand, web, and dev moving at the same time without the agency overhead.",
    price: "$10,199",
    suffix: "/ month",
    isCustom: false,
  };
  return {
    badge: "Custom",
    subtitle: "3+ active tasks — full capacity",
    description: "Full design and development bandwidth locked to you. Scope, pricing, and capacity set to your exact needs.",
    price: "Let's talk",
    suffix: "",
    isCustom: true,
  };
}

export default function PricingV2() {
  const [activeTab, setActiveTab] = useState("website");
  const [tasks, setTasks] = useState(1);

  const activeContent = tabs.find(t => t.id === activeTab) ?? tabs[0];
  const retainer = getRetainerTier(tasks);
  const displayTasks = tasks >= 3 ? "3+" : String(tasks);

  return (
    <section className={styles.pricingFrame} id="pricing-v2">
      <div className={styles.pricing}>
        <div className={styles.topNotch} aria-hidden="true" />

        <div className={styles.pricingHeader}>
          <span className={styles.eyebrow}>Pricing</span>
          <h2 className={styles.pricingTitle}>
            <span className={styles.pricingTitleBold}>Transparent services.</span>
            <span className={styles.pricingTitleAccent}>Zero surprises.</span>
          </h2>
          <p className={styles.pricingSubtitle}>
            One-time scoped projects or a monthly retainer. Pick what fits — or start with a project and stay on.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.layoutSplit}>

          {/* ONE-TIME PROJECT CARD */}
          <div className={styles.horizontalCard}>
            <div className={styles.cardLeftNotch} aria-hidden="true" />
            <div className={styles.leftPane}>
              <div className={styles.cardHeaderArea}>
                <h3 className={styles.cardTitle}>{activeContent.title}</h3>
                <div className={styles.timelineWrap}>
                  <ClockIcon /> {activeContent.timeline}
                </div>
              </div>

              <p className={styles.description}>{activeContent.description}</p>

              <ul className={styles.featureList}>
                {activeContent.features.map(feature => (
                  <li key={feature} className={styles.feature}>
                    <span className={styles.featureIcon}><CheckIcon /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.rightPane}>
              <div className={`${styles.priceCard} ${styles.priceCardProject}`}>
                <div className={styles.priceCardTab} aria-hidden="true" />
                <div className={styles.priceCardAccent} aria-hidden="true" />
                <span className={styles.priceCardLogo} aria-hidden="true">tie<span className={styles.priceCardLogoDot}>.</span></span>
                <div className={styles.priceCardBottom}>
                  <span className={styles.priceLabel}>{activeContent.title}</span>
                  <span className={styles.price}>{activeContent.price}</span>
                </div>
              </div>
              <div className={styles.ctaBlock}>
                <Button label="Submit Project" href="/start" variant="dark" size="md" />
                <Button label="Book Call" href="/book" variant="light" size="md" />
              </div>
            </div>
          </div>

          {/* RETAINER CARD */}
          <div className={styles.horizontalCard}>
            <div className={styles.cardLeftNotch} aria-hidden="true" />
            <div className={styles.leftPane}>
              <div className={styles.retainerHeaderStack}>
                <div className={styles.retainerTitleRow}>
                  <h3 className={styles.cardTitle}>Monthly Retainer</h3>
                  {!retainer.isCustom && (
                    <span className={styles.retainerTierBadge}>{retainer.badge}</span>
                  )}
                </div>

                <p className={styles.description}>{retainer.description}</p>
              </div>

              <ul className={styles.featureList}>
                <li className={styles.feature}>
                  <div className={styles.taskSelector}>
                    <div className={styles.taskCounter}>
                      <button
                        onClick={() => setTasks(prev => Math.max(1, prev - 1))}
                        disabled={tasks <= 1}
                        className={styles.counterBtn}
                        aria-label="Decrease active tasks"
                      >
                        −
                      </button>
                      <span className={styles.counterValue}>{displayTasks}</span>
                      <button
                        onClick={() => setTasks(prev => Math.min(3, prev + 1))}
                        disabled={tasks >= 3}
                        className={styles.counterBtn}
                        aria-label="Increase active tasks"
                      >
                        +
                      </button>
                    </div>
                    <span className={styles.taskLabel}>Active Tasks</span>
                  </div>
                </li>
                <li className={styles.feature}>
                  <span className={styles.featureIcon}><CheckIcon /></span>
                  <span>Updates every 48 hours, Monday–Friday</span>
                </li>
                <li className={styles.feature}>
                  <span className={styles.featureIcon}><CheckIcon /></span>
                  <span>24-hour first response SLA</span>
                </li>
                <li className={styles.feature}>
                  <span className={styles.featureIcon}><CheckIcon /></span>
                  <span>Pause or cancel anytime, zero contracts</span>
                </li>
              </ul>

              <div className={styles.tagsGrid}>
                {capabilities.map(cap => (
                  <span key={cap} className={styles.tagPill}>{cap}</span>
                ))}
              </div>
            </div>

            <div className={styles.rightPane}>
              <div className={`${styles.priceCard} ${retainer.isCustom ? styles.priceCardCustom : styles.priceCardRetainer}`} style={retainer.isCustom ? {} : { background: "var(--brand-orange)" }}>
                <div className={styles.priceCardTab} aria-hidden="true" />
                <div className={styles.priceCardAccent} aria-hidden="true" />
                <span className={styles.priceCardLogo} aria-hidden="true">tie<span className={styles.priceCardLogoDot}>.</span></span>
                <div className={styles.priceCardBottom}>
                  <span className={styles.priceLabel}>Monthly Retainer</span>
                  <span className={`${styles.price} ${retainer.isCustom ? styles.priceCustom : ""}`}>
                    {retainer.price}
                  </span>
                </div>
              </div>
              <div className={styles.ctaBlock}>
                {retainer.isCustom ? (
                  <Button label="Book a Call" href="/book" variant="dark" size="md" />
                ) : (
                  <>
                    <Button label="Submit Project" href="/start" variant="dark" size="md" />
                    <Button label="Book Call" href="/book" variant="light" size="md" />
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
