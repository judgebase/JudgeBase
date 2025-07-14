import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Star, Users, Zap, Shield } from "lucide-react";

export function WhyJudgeBase() {
  const features = [
    {
      icon: CheckCircle,
      title: "Curated",
      description: "Only experienced judges who bring real value to your hackathon participants.",
      gradient: "from-purple-50 to-blue-50",
      iconBg: "gradient-bg",
      animation: "animate-bounce-soft"
    },
    {
      icon: Clock,
      title: "Async",
      description: "Flexible judging that works with everyone's schedule across time zones.",
      gradient: "from-blue-50 to-green-50",
      iconBg: "gradient-bg-cool",
      animation: "animate-float"
    },
    {
      icon: Star,
      title: "Recognized",
      description: "Industry experts and founders who participants actually want to meet.",
      gradient: "from-green-50 to-purple-50",
      iconBg: "gradient-bg-warm",
      animation: "animate-pulse-glow"
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Why Choose JudgeBase?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We connect you with the right experts to make your hackathon a success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 gradient-bg rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
              <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Curated Experts</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Hand-picked judges with proven experience in their fields, ensuring quality feedback for your participants
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 gradient-bg-cool rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Quick Matching</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Get matched with the perfect judges for your event in minutes using our intelligent matching system
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 gradient-bg-warm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Quality Assured</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              All judges are verified and committed to providing valuable, constructive feedback to help teams grow
            </p>
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