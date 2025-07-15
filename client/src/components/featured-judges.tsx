import { JudgeCard } from "./judge-card";
import { getFeaturedJudges } from "@/data/judges";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function FeaturedJudges() {
  const featuredJudges = getFeaturedJudges();
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Featured Judges
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Featured Judges
          </h2>
          <div className="text-center text-gray-600">
            Failed to load featured judges. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-5 blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-5 blur-2xl animate-bounce-soft"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-lg mb-6">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700">Meet Our Top Judges</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Featured{" "}
            <span className="gradient-text-vibrant relative">
              Judges
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Industry experts ready to provide valuable feedback and elevate your hackathon experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {featuredJudges?.map((judge, index) => (
            <div key={judge.id} className={`transform transition-all duration-500 ${index % 2 === 0 ? 'animate-float' : 'animate-bounce-soft'}`}>
              <JudgeCard judge={judge} />
            </div>
          ))}
        </div>
        
        {/* View All Judges CTA */}
        <div className="text-center mt-16">
          <Link href="/find-judges">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl">
              View All Judges
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}