import HomeHero from "@/components/sections/HomeHero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Introduction from "@/components/sections/Introduction";
import HomeServices from "@/components/sections/HomeServices";
import StartupVelocity from "@/components/sections/StartupVelocity";
import HomeFeaturedTestimonial from "@/components/sections/HomeFeaturedTestimonial";
import FAQ from "@/components/sections/FAQ";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import PricingV2 from "@/components/sections/PricingV2";
import AboutBio from "@/components/sections/AboutBio";
import ClientRoster from "@/components/sections/ClientRoster";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <HomeHero />
      <LogoMarquee />
      <Introduction />
      <FeaturedProjects />
      <ClientRoster />
      <HomeFeaturedTestimonial />
      <HomeServices />
      <StartupVelocity />
      <CallToAction href="/start" />
      <PricingV2 />
      <AboutBio />
      <FAQ />
    </>
  );
}
