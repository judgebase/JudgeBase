import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Calendar, Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden">
      {/* Floating colored sections */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full opacity-60 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full opacity-60 blur-3xl animate-bounce-soft"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full opacity-40 blur-3xl animate-pulse-glow"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 shadow-lg mb-8 animate-float">
            <Star className="h-5 w-5 text-purple-600 fill-current" />
            <span className="text-sm font-semibold text-purple-800">Trusted by 500+ hackathons worldwide</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-light text-gray-600">real judges.</span>
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              real hackathons.
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            JudgeBase is a curated panel of <span className="text-purple-600 font-bold">experienced professionals</span> who evaluate hackathons, 
            mentor builders, and support innovation — <span className="text-blue-600 font-bold">async or live</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/apply">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl group">
                <span className="flex items-center gap-3">
                  Apply to Judge
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/host">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Request Judges for Your Event
              </Button>
            </Link>
          </div>
          
          {/* Judge avatars grid with subtle blur */}
          <div className="mb-16 relative">
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-4 max-w-3xl mx-auto opacity-60">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 blur-sm animate-pulse"></div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl border border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 group animate-float">
              <div className="gradient-bg-cool w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-2">200+</div>
              <div className="text-base text-gray-600 font-medium">Expert Judges</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 group animate-bounce-soft">
              <div className="gradient-bg-warm w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-2">24hr</div>
              <div className="text-base text-gray-600 font-medium">Response Time</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-purple-50 rounded-3xl border border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 group animate-pulse-glow">
              <div className="gradient-bg-vibrant w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Check className="h-10 w-10 text-white" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-2">98%</div>
              <div className="text-base text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}