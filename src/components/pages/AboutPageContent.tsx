"use client";

import AboutHero from "@/components/sections/AboutHero";
import AboutStats from "@/components/sections/AboutStats";
import AboutBio from "@/components/sections/AboutBio";
import Philosophy from "@/components/sections/Philosophy";
import AboutGlobal from "@/components/sections/AboutGlobal";
import StartupVelocity from "@/components/sections/StartupVelocity";
import CallToAction from "@/components/sections/CallToAction";
import aboutContent from "../../../content/about.json";

export default function AboutPageContent({ content }: { content?: any }) {
  const finalContent = content || aboutContent;
  const { hero, stats, bio } = finalContent;

  return (
    <main>
      <AboutHero
        title={hero.title}
        subtitle={hero.subtitle}
        image={hero.image}
      />

      <AboutStats stats={stats} />
      <AboutBio bio={bio} />

      <Philosophy />
      <StartupVelocity />

      <CallToAction href="/start" />

      <AboutGlobal />
    </main>
  );
}
