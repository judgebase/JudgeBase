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
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-40 w-64 h-64 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-5 blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-40 w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-5 blur-3xl animate-bounce-soft"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-lg mb-6">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-semibold text-gray-700">Why Choose Us</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Why Choose{" "}
            <span className="gradient-text-vibrant relative">
              JudgeBase
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-ping"></div>
            </span>
            ?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We connect you with the <span className="text-purple-600 font-semibold">right experts</span> to make your hackathon a <span className="text-blue-600 font-semibold">success</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className={`text-center group ${feature.animation}`}>
              <div className="relative mb-8">
                <div className={`w-24 h-24 mx-auto ${feature.iconBg} rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-110`}>
                  <feature.icon className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-80 transition-opacity animate-pulse"></div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful hackathons that trust JudgeBase for their judging needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105">
                  Apply as Judge
                </Button>
              </Link>
              <Link href="/find-judges">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300">
                  Find Judges
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