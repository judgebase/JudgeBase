import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-95" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
          Expert Judges for
          <span className="block gradient-bg-warm bg-clip-text text-transparent animate-pulse mt-2">
            Your Hackathon
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
          Connect with curated industry experts who will elevate your hackathon experience and provide invaluable feedback
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
          <Button size="lg" className="w-full sm:w-auto gradient-bg hover:opacity-90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/apply" className="flex items-center justify-center">
              Apply as Judge
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
            <Link href="/host" className="flex items-center justify-center">
              Host an Event
            </Link>
          </Button>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-200 text-sm sm:text-base">Expert Judges</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">1000+</div>
            <div className="text-gray-200 text-sm sm:text-base">Hackathons Judged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-200 text-sm sm:text-base">Industries Covered</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}