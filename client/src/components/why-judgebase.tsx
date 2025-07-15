import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Star, Users, Zap, Shield } from "lucide-react";

export function WhyJudgeBase() {
  const features = [
    {
      icon: Users,
      title: "Curated Experts",
      description: "Hand-picked judges with proven experience in their fields, ensuring quality feedback for your participants",
      gradient: "from-purple-50 to-blue-50",
      iconBg: "gradient-bg",
      animation: "animate-bounce-soft"
    },
    {
      icon: Zap,
      title: "Quick Matching",
      description: "Get matched with the perfect judges for your event in minutes using our intelligent matching system",
      gradient: "from-blue-50 to-green-50",
      iconBg: "gradient-bg-cool",
      animation: "animate-float"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All judges are verified and committed to providing valuable, constructive feedback to help teams grow",
      gradient: "from-green-50 to-purple-50",
      iconBg: "gradient-bg-warm",
      animation: "animate-pulse-glow"
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-5 blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-5 blur-2xl animate-bounce-soft"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-md mb-6">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Why Choose Us</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Why Choose{" "}
            <span className="gradient-text-vibrant">
              JudgeBase
            </span>
            ?
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We connect you with the <span className="text-purple-600 font-semibold">right experts</span> to make your hackathon a <span className="text-blue-600 font-semibold">success</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className={`text-center group ${feature.animation}`}>
              <div className="relative mb-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto ${feature.iconBg} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                  <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {feature.description}
              </p>
              
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
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
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-bold rounded-xl transition-all duration-300">
                  <span className="text-white">Find Judges</span>
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