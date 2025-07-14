import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Calendar, Check } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-bounce-soft"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-8">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">Trusted by 500+ hackathons</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
            Find Perfect{" "}
            <span className="gradient-text-vibrant">Judges</span>
            <br />
            for Your Hackathon
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with vetted industry experts who will elevate your event and provide invaluable feedback to participants.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/apply">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white hover:shadow-2xl px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/20 backdrop-blur-sm shadow-2xl animate-pulse-glow">
                <span className="flex items-center gap-3">
                  ✨ Apply as Judge
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/host">
              <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
                Host an Event
              </Button>
            </Link>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 animate-float">
              <div className="gradient-bg-cool w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">200+ Expert Judges</h3>
              <p className="text-gray-600">Curated network of industry professionals</p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 animate-bounce-soft">
              <div className="gradient-bg-warm w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24hr Response</h3>
              <p className="text-gray-600">Quick turnaround for your requests</p>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-100 animate-pulse-glow">
              <div className="gradient-bg-vibrant w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">98% Success Rate</h3>
              <p className="text-gray-600">Proven track record of quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="text-center mb-12">
        <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide">Trusted by</p>
        <div className="flex items-center justify-center space-x-8 opacity-60">
          <div className="text-gray-400 font-semibold">Maximally</div>
          <div className="text-gray-400 font-semibold">Masters' Union</div>
          <div className="text-gray-400 font-semibold">DEVPOST</div>
          <div className="text-gray-400 font-semibold">••••</div>
        </div>
      </div>
    </section>
  );
}