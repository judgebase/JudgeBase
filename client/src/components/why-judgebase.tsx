import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Star, Users, Zap, Shield } from "lucide-react";

export function WhyJudgeBase() {
  const features = [
    {
      icon: Shield,
      title: "Vetted Panelists",
      description: "Every judge is manually approved. No fluff, no filler.",
      gradient: "from-purple-50 to-blue-50",
      iconBg: "gradient-bg",
      animation: "animate-bounce-soft"
    },
    {
      icon: Clock,
      title: "Async-Ready",
      description: "Most judges evaluate remotely. No timezone headaches.",
      gradient: "from-blue-50 to-green-50",
      iconBg: "gradient-bg-cool",
      animation: "animate-float"
    },
    {
      icon: Star,
      title: "Signal, Not Noise",
      description: "This isn't just a signup list. It's a high-trust layer for the hackathon space.",
      gradient: "from-green-50 to-purple-50",
      iconBg: "gradient-bg-warm",
      animation: "animate-pulse-glow"
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full opacity-40 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full opacity-40 blur-3xl animate-bounce-soft"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-600 block mb-2">why it</span>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              matters
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className={`text-center group ${feature.animation}`}>
              <div className="relative mb-8">
                <div className={`w-24 h-24 mx-auto ${feature.iconBg} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-300 transform group-hover:scale-110`}>
                  <feature.icon className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-medium">
                {feature.description}
              </p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 md:mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful hackathons that trust JudgeBase
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105">
                  Apply as Judge
                </Button>
              </Link>
              <Link href="/find-judges">
                <Button size="lg" variant="outline" className="border-2 border-white text-black hover:bg-white/10 px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300">
                  <span className="text-black">Find Judges</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">98%</div>
                <div className="text-gray-600 text-sm sm:text-base">Judge Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">24hrs</div>
                <div className="text-gray-600 text-sm sm:text-base">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-gray-600 text-sm sm:text-base">Platform Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}