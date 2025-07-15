import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Calendar, Check } from "lucide-react";
import { LogoCarousel } from "./logo-carousel";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 md:py-24 overflow-hidden">
      {/* Clean Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Subtle Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-8 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-8 blur-3xl animate-bounce-soft"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-md mb-6 animate-float">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700">Trusted by 500+ hackathons</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Find Perfect{" "}
            <span className="gradient-text-vibrant relative">
              Judges
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline"> for Your Hackathon</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with <span className="text-purple-600 font-semibold">vetted industry experts</span> who will elevate your event
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/apply">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl group">
                <span className="flex items-center gap-3">
                  ✨ Apply as Judge
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/find-judges">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105">
                Find Judges
              </Button>
            </Link>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 group animate-float">
              <div className="gradient-bg-cool w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-sm text-gray-600">Expert Judges</div>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 group animate-bounce-soft">
              <div className="gradient-bg-warm w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">24hr</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse-glow">
              <div className="gradient-bg-vibrant w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Check className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}