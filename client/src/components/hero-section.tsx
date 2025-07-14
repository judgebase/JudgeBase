import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
          be on the panel.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-up">
          we connect serious events with serious judges.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link href="/apply">
            <Button className="gradient-bg text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-xl transition-all animate-pulse-glow">
              i want to judge
            </Button>
          </Link>
          <Link href="/host">
            <Button
              variant="outline"
              className="bg-white text-gray-700 px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-primary hover:shadow-lg transition-all"
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
      </div>
    </section>
  );
}
