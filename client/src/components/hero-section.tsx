import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="gradient-text">be on the panel.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up">
          we connect serious events with <span className="gradient-text-warm font-semibold">serious judges.</span>
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/apply">
            <Button className="gradient-bg text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-xl transition-all animate-rainbow-glow">
              i want to judge
            </Button>
          </Link>
          <Link href="/host">
            <Button
              variant="outline"
              className="gradient-bg-warm text-white px-8 py-4 text-lg font-semibold rounded-xl border-2 border-transparent hover:shadow-lg transition-all animate-float"
            >
              i'm a hackathon looking for judges
            </Button>
          </Link>
        </div>
        
        {/* Trust Strip */}
        <div className="mb-20">
          <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide">Trusted by</p>
          <div className="flex items-center justify-center space-x-8 opacity-60">
            <div className="text-gray-400 font-semibold">Maximally</div>
            <div className="text-gray-400 font-semibold">Masters' Union</div>
            <div className="text-gray-400 font-semibold">DEVPOST</div>
            <div className="text-gray-400 font-semibold">••••</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl animate-float">
            <div className="gradient-bg w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">200+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Expert Judges</h3>
            <p className="text-gray-600 text-sm">Vetted professionals</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl animate-bounce-soft">
            <div className="gradient-bg-cool w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">500+</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Events Judged</h3>
            <p className="text-gray-600 text-sm">Successful placements</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl animate-pulse-glow">
            <div className="gradient-bg-warm w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">98%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Satisfaction Rate</h3>
            <p className="text-gray-600 text-sm">Happy organizers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
