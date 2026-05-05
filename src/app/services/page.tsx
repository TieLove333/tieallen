import type { Metadata } from "next";
import {
  ServicesHero,
  ServiceSection,
} from "@/components/sections/ServicesPage";
import CallToAction from "@/components/sections/CallToAction";
import StartupVelocity from "@/components/sections/StartupVelocity";
import Pricing from "@/components/sections/Pricing";
import styles from "@/components/sections/services-page.module.css";

export const metadata: Metadata = {
  title: "Services - made by tie.",
  description:
    "Web design, development, branding, funnels, and CRM automation.",
};

const SERVICES = [
  {
    headline: "Web Design",
    href: "/services/web-design",
    body: "High-end websites built to convert. Every pixel, layout, and interaction is crafted with absolute precision.",
    capabilities: [
      "Website Design",
      "Landing Pages",
      "eCommerce",
      "UI & UX Design",
      "Responsive Design",
      "Design Systems",
    ],
    image: "/projects/windward-tech-district/culture-screenshot.png",
  },
  {
    headline: "Development",
    href: "/services/development",
    body: "Custom platforms, SaaS products, and internal tools built to solve real problems. High performance, seamless user experiences, and a foundation built to scale.",
    capabilities: [
      "Custom Web Apps",
      "eCommerce Platforms",
      "Membership Sites",
      "SaaS Products",
      "Full-stack Systems",
      "Performance",
    ],
    image: "/assets/development.png",
  },
  {
    headline: "Branding",
    href: "/services/branding",
    body: "High-impact brand identities built from the ground up. Logo, color, type, and visual systems designed for consistency and market authority.",
    capabilities: [
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines",
      "Typography",
      "Color Palettes",
      "Brand Collateral",
    ],
    image: "/projects/permissionless/pv-bcard-mockup.png",
  },
  {
    headline: "Automation",
    href: "/services/crm-automation",
    body: "Intelligent systems and smart funnels that drive revenue in the background. Automated follow-ups, lead nurturing, and pipelines designed to convert.",
    capabilities: [
      "Vizon OS Setup",
      "Sales Funnels",
      "Email Marketing",
      "Marketing Automation",
      "CRM + Pipelines",
      "Lead Nurturing",
    ],
    image: "/assets/crm-v1.webp",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <div className={styles.divider} />
      {SERVICES.map((service) => (
        <ServiceSection key={service.headline} {...service} />
      ))}
      <StartupVelocity />
      <Pricing />
      <CallToAction href="/start" />
    </main>
  );
}
