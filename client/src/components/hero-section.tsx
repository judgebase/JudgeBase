import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Calendar, Check } from "lucide-react";
import { LogoCarousel } from "./logo-carousel";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-32 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Multiple Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-bounce-soft"></div>
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-gradient-to-br from-green-400 to-teal-400 rounded-full opacity-8 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 left-1/2 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-8 blur-2xl animate-float"></div>
      
      {/* Sparkle Effects */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Enhanced Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 shadow-lg mb-8 animate-bounce-soft">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Trusted by 500+ hackathons worldwide</span>
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight max-w-6xl mx-auto">
            Find Perfect{" "}
            <span className="gradient-text-vibrant animate-pulse-glow relative">
              Judges
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-ping"></div>
            </span>
            <br />
            for Your{" "}
            <span className="relative">
              Hackathon
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </span>
          </h1>
          
          {/* Enhanced Subheading */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Connect with <span className="text-purple-600 font-semibold">vetted industry experts</span> who will 
            <span className="text-blue-600 font-semibold"> elevate your event</span> and provide 
            <span className="text-green-600 font-semibold">invaluable feedback</span> to participants.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/apply">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white hover:shadow-2xl px-12 py-8 text-2xl font-bold rounded-3xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 backdrop-blur-sm shadow-2xl animate-pulse-glow relative group">
                <span className="flex items-center gap-4">
                  ✨ Apply as Judge
                  <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </Link>
            <Link href="/find-judges">
              <Button size="lg" variant="outline" className="border-3 border-purple-600 text-purple-600 hover:bg-purple-50 px-10 py-8 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl group">
                <span className="flex items-center gap-3">
                  Find Judges for Your Hackathon
                  <Users className="h-6 w-6 group-hover:scale-110 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
          
          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100 shadow-xl animate-float hover:shadow-2xl transition-all duration-300 group">
              <div className="gradient-bg-cool w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">200+ Expert Judges</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Curated network of industry professionals ready to elevate your event</p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100 shadow-xl animate-bounce-soft hover:shadow-2xl transition-all duration-300 group">
              <div className="gradient-bg-warm w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24hr Response</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Lightning-fast turnaround for your hackathon judging requests</p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-purple-100 shadow-xl animate-pulse-glow hover:shadow-2xl transition-all duration-300 group">
              <div className="gradient-bg-vibrant w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">98% Success Rate</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Proven track record of delivering exceptional judging experiences</p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <LogoCarousel />
    </section>
  );
}