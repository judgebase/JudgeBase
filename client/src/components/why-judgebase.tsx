import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Star } from "lucide-react";

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
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why JudgeBase?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`text-center p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} card-hover`}
                >
                  <div className={`w-16 h-16 ${feature.iconBg} rounded-full mx-auto mb-6 flex items-center justify-center ${feature.animation}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to elevate your hackathon?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the exclusive network of expert judges and premium hackathon organizers.
            </p>
            <Link href="/judges/preview">
              <Button className="gradient-bg-vibrant text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-xl transition-all animate-rainbow-glow">
                See how Judge Pages work →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
