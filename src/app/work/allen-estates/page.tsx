import type { Metadata } from "next";
import ProjectHero from "@/components/sections/ProjectHero";
import CaseStudyIntro from "@/components/sections/CaseStudyIntro";
import CaseStudySplitContent from "@/components/sections/CaseStudySplitContent";
import CaseStudyImageGrid from "@/components/sections/CaseStudyImageGrid";
import CaseStudyVideoShowcase from "@/components/sections/CaseStudyVideoShowcase";
import CaseStudyDeviceShowcase from "@/components/sections/CaseStudyDeviceShowcase";
import MultiMobileShowcase from "@/components/sections/MultiMobileShowcase";
import CaseStudyScreenGrid from "@/components/sections/CaseStudyScreenGrid";
import BrandPalette from "@/components/sections/BrandPalette";
import CallToAction from "@/components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Allen Estates - made by tie.",
  description:
    "Brand and high-end website build for Allen Estates - a private collection of world-class luxury estates.",
};

export default function AllenEstates() {
  return (
    <>
      {/* Hero */}
      <ProjectHero
        title="A private collection of world-class estates."
        tags={["Brand Identity", "Web Design", "Web Development"]}
        image="/projects/allen-estates/hero-top.webp"
      />

      {/* Intro */}
      <CaseStudyIntro
        headline="Crafting a curated luxury brand and high-end digital presence for a portfolio of exclusive private residences."
        description="Allen Estates represents a hand-selected collection of private estates in exclusive locations. The project scope centered around establishing a refined brand identity and building a seamless, immersive website showcasing their meticulously equipped escapes and selling the Allen Estates experience."
        client="Allen Estates"
        industry="Luxury Real Estate / Hospitality"
        timeline="4 Weeks"
      />

      {/* Website showcase hero over blurred bg */}
      <CaseStudyVideoShowcase
        imageSrc="/projects/allen-estates/hero.webp"
        imageAlt="Allen Estates homepage"
      />

      {/* Wide hero image */}
      <CaseStudyImageGrid
        columns={2}
        images={[
          {
            src: "/projects/allen-estates/hero-wide.webp",
            alt: "Allen Estates properties showcase",
            span: "wide",
            aspectRatio: "16/8",
          },
        ]}
      />

      {/* Brand */}
      <CaseStudySplitContent
        layout="text-split"
        eyebrow="• Brand Identity"
        heading="Defining elevated escapes"
        body="The brand identity for Allen Estates needed to instantly convey exclusivity, refinement, and an unwavering commitment to detail. From the peaks of Tamarack Resort in Idaho to the shores of the Sea of Cortez in Mexico, the portfolio spans diverse aesthetics—from rustic alpine to coastal serenity."
        body2="We designed a unified visual language that acts as a quiet, elegant backdrop to the stunning property photography. The typography and color palette evoke a sense of calm and luxury, perfectly aligning with their promise of transformational experiences and 100% turnkey readiness."
        bgColor="var(--bg-secondary)"
      />

      {/* Brand Logos */}
      <CaseStudyImageGrid
        columns={2}
        bgColor="var(--bg-secondary)"
        images={[
          {
            src: "/projects/allen-estates/logo-white.svg",
            alt: "Allen Estates Logo on Dark",
            display: "logo",
            bg: "#0a0a0c",
            aspectRatio: "16/9",
            padding: "12%",
          },
          {
            src: "/projects/allen-estates/logo-dark.svg",
            alt: "Allen Estates Logo on Light",
            display: "logo",
            bg: "#f3eee7",
            aspectRatio: "16/9",
            padding: "12%",
          },
        ]}
      />

      {/* Brand Palette */}
      <BrandPalette
        eyebrow="• Color System"
        heading="A refined palette for luxury living"
        description="The brand palette leans on soft, warm off-whites paired with rich golds and deep charcoal, creating an aesthetic that is both inviting and distinctly high-end."
        colors={[
          { name: "Estate Black", value: "#0a0a0c", hexLabel: "#0A0A0C" },
          {
            name: "Signature Gold",
            value: "linear-gradient(135deg, #dbbe8d 0%, #9c7240 100%)",
            hexLabel: "Gradient",
          },
          { name: "Warm Alabaster", value: "#f3eee7", hexLabel: "#F3EEE7" },
        ]}
        bgColor="var(--bg-secondary)"
      />

      {/* Website intro */}
      <CaseStudySplitContent
        layout="text-split"
        eyebrow="• Website"
        heading="A digital gateway to curated luxury living"
        body="The website was built to serve as a high-end digital brochure and direct inquiry channel. It introduces prospective guests to the four exclusive destination regions—Idaho, Arizona, Mexico, and California—highlighting the seamless indoor-outdoor living, professional-grade amenities, and dedicated concierge access."
        body2="We prioritized a highly visual, immersive browsing experience. The interface is intentionally minimalist, ensuring that the sprawling waterfront views and alpine luxury take center stage while providing an effortless, frictionless path to the concierge request system."
      />

      {/* Live website showcase */}
      <CaseStudyDeviceShowcase
        type="desktop"
        desktopUrl="https://allenestates.vizonos.com/"
      />

      {/* Property Showcases */}
      <CaseStudySplitContent
        layout="text-split"
        eyebrow="• Property Showcases"
        heading="Immersive property experiences"
        body="Each destination has a dedicated showcase highlighting its unique architecture and lifestyle. The full-bleed imagery and smooth scrolling narratives are meticulously designed to build anticipation."
        bgColor="var(--bg-secondary)"
      />

      {/* Desktop screenshots grid */}
      <CaseStudyImageGrid
        columns={2}
        bgColor="var(--bg-secondary)"
        images={[
          {
            src: "/projects/allen-estates/casa-jefe-hero.webp",
            alt: "Casa Jefe property hero",
            display: "screenshot",
            aspectRatio: "16/10",
            objectFit: "cover",
            objectPosition: "top",
          },
          {
            src: "/projects/allen-estates/havasu-hero.webp",
            alt: "Waterfront Estate property hero",
            display: "screenshot",
            aspectRatio: "16/10",
            objectFit: "cover",
            objectPosition: "top",
          },
        ]}
      />

      {/* Mobile Showcase */}
      <MultiMobileShowcase
        images={[
          {
            src: "/projects/allen-estates/mobile-home-hero.webp",
            alt: "Home page mobile view",
          },
          {
            src: "/projects/allen-estates/mobile-property-hero.webp",
            alt: "Property hero mobile view",
          },
          {
            src: "/projects/allen-estates/mobile-property-section.webp",
            alt: "Property details mobile view",
          },
        ]}
        innerBgColor="#f4f4f5"
      />

      {/* Website pages grid */}
      <CaseStudyScreenGrid
        images={[
          {
            src: "/projects/allen-estates/grid-1.webp",
            alt: "Allen Estates homepage hero",
          },
          {
            src: "/projects/allen-estates/grid-2.webp",
            alt: "Allen Estates homepage properties",
          },
          {
            src: "/projects/allen-estates/grid-3.webp",
            alt: "Allen Estates homepage brand experience",
          },
          {
            src: "/projects/allen-estates/grid-4.webp",
            alt: "Allen Estates Casa Jefe hero",
          },
          {
            src: "/projects/allen-estates/grid-5.webp",
            alt: "Allen Estates Casa Jefe amenities",
          },
          {
            src: "/projects/allen-estates/grid-6.webp",
            alt: "Allen Estates Tamarack content",
          },
          {
            src: "/projects/allen-estates/grid-7.webp",
            alt: "Allen Estates Havasu content",
          },
          {
            src: "/projects/allen-estates/grid-8.webp",
            alt: "Allen Estates California content",
          },
          {
            src: "/projects/allen-estates/grid-9.webp",
            alt: "Allen Estates Holiday Loreto hero",
          },
        ]}
      />

      <CallToAction />
    </>
  );
}
