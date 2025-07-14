import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedJudges } from "@/components/featured-judges";
import { WhyJudgeBase } from "@/components/why-judgebase";
import { Footer } from "@/components/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "JudgeBase - Connect serious events with serious judges";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'We connect serious events with serious judges. Join our curated panel of expert hackathon judges.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <FeaturedJudges />
      <WhyJudgeBase />
      <Footer />
    </div>
  );
}
