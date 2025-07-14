import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      period: "per month",
      description: "Perfect for small hackathons and events",
      features: [
        "Up to 5 judge placements",
        "Basic judge matching",
        "Email support",
        "Standard response time",
        "Basic analytics"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "Ideal for medium to large hackathons",
      features: [
        "Up to 20 judge placements",
        "Advanced judge matching",
        "Priority email & chat support",
        "24hr response time",
        "Advanced analytics",
        "Custom judge requirements",
        "Post-event feedback reports"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations and recurring events",
      features: [
        "Unlimited judge placements",
        "AI-powered matching",
        "Dedicated account manager",
        "Same-day response time",
        "Custom integrations",
        "White-label solution",
        "Advanced reporting & analytics",
        "Priority judge access"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "JudgeBase Pricing",
    "description": "Flexible pricing plans for hackathon judge services",
    "provider": {
      "@type": "Organization",
      "name": "JudgeBase"
    },
    "offers": plans.map(plan => ({
      "@type": "Offer",
      "name": plan.name,
      "price": plan.price === "Custom" ? "0" : plan.price.replace("$", ""),
      "priceCurrency": "USD",
      "description": plan.description
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <SEO
        title="Pricing Plans - Expert Judge Services"
        description="Choose the perfect pricing plan for your hackathon. From $99/month for small events to enterprise solutions for large organizations."
        keywords="hackathon judge pricing, judge service cost, hackathon pricing, judge network pricing"
        ogTitle="JudgeBase Pricing - Expert Judge Services for Every Budget"
        ogDescription="Choose the perfect pricing plan for your hackathon. From $99/month for small events to enterprise solutions for large organizations."
        structuredData={pricingStructuredData}
        canonical="https://judgebase.com/pricing"
      />
      <Navbar />
      
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent{" "}
              <span className="gradient-text-vibrant">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your hackathon. All plans include access to our curated judge network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-2 border-purple-500 animate-pulse-glow' 
                    : 'border border-gray-200 hover:border-purple-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 ${
                      plan.popular 
                        ? 'gradient-bg-vibrant text-white hover:shadow-lg' 
                        : 'gradient-bg text-white hover:shadow-lg'
                    }`}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  We offer a 14-day free trial for the Professional plan. No credit card required to start.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's included in judge matching?
                </h3>
                <p className="text-gray-600">
                  Our AI-powered system matches judges based on expertise, availability, and event requirements.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you offer custom solutions?
                </h3>
                <p className="text-gray-600">
                  Yes, our Enterprise plan includes custom integrations, white-label solutions, and dedicated support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}