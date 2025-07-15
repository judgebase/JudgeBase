import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedJudges } from "@/components/featured-judges";
import { BeOnPanel } from "@/components/be-on-panel";
import { WhyJudgeBase } from "@/components/why-judgebase";
import { LogoCarousel } from "@/components/logo-carousel";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JudgeBase",
    "description": "Expert judge network for hackathons and tech events",
    "url": "https://judgebase.com",
    "logo": "https://judgebase.com/logo.png",
    "sameAs": [
      "https://twitter.com/judgebase",
      "https://linkedin.com/company/judgebase"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Expert Judge Network for Hackathons"
        description="Connect with vetted industry experts for your hackathon. Access 200+ professional judges, get 24hr response, and achieve 98% success rate."
        keywords="hackathon judges, expert judges, hackathon judging, judge network, hackathon platform, tech event judges"
        ogTitle="JudgeBase - Expert Judge Network for Hackathons"
        ogDescription="Connect with vetted industry experts for your hackathon. Access 200+ professional judges, get 24hr response, and achieve 98% success rate."
        structuredData={structuredData}
        canonical="https://judgebase.com"
      />
      <Navbar />
      <HeroSection />
      <FeaturedJudges />
      <BeOnPanel />
      <WhyJudgeBase />
      <LogoCarousel />
      <Footer />
    </div>
  );
}
