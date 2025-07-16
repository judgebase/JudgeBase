import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-60 h-60 bg-white/10 rounded-full opacity-40 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full opacity-40 blur-3xl animate-bounce-soft"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
          <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white/80 block mb-2">you've judged before.</span>
          <span className="block">
            now do it properly.
          </span>
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Join the fastest-growing judge panel for real events.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/apply">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl group">
              <span className="flex items-center gap-3">
                Apply to Join
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link href="/host">
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Request Judges
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}