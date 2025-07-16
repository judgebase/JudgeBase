import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { LogoCarousel } from "@/components/logo-carousel";
import { WhoIsJudgeBaseFor } from "@/components/who-is-judgebase-for";
import { WhyJudgeBase } from "@/components/why-judgebase";
import { FeaturedJudges } from "@/components/featured-judges";
import { HowItWorks } from "@/components/how-it-works";
import { FinalCTA } from "@/components/final-cta";
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
    <div className="min-h-screen bg-white">
      <SEO
        title="Real Judges. Real Hackathons. - JudgeBase"
        description="JudgeBase is a curated panel of experienced professionals who evaluate hackathons, mentor builders, and support innovation — async or live."
        keywords="hackathon judges, expert judges, hackathon judging, judge network, hackathon platform, tech event judges, professional judges"
        ogTitle="JudgeBase - Real Judges. Real Hackathons."
        ogDescription="JudgeBase is a curated panel of experienced professionals who evaluate hackathons, mentor builders, and support innovation — async or live."
        structuredData={structuredData}
        canonical="https://judgebase.com"
      />
      <Navbar />
      <HeroSection />
      <LogoCarousel />
      <WhoIsJudgeBaseFor />
      <WhyJudgeBase />
      <FeaturedJudges />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </div>
  );
}
