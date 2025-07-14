import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo className="h-9 w-auto" />
            <span className="ml-3 text-xl font-bold gradient-bg bg-clip-text text-transparent">
              JudgeBase
            </span>
          </div>

          {isMobile ? (
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Home
              </Link>
              <Link href="/apply" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Apply as Judge
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Blog
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Pricing
              </Link>
              <Link href="/host" className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium">
                Host Event
              </Link>
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 hover:border-purple-700 transition-all duration-200">
                Sign In
              </Button>
            </div>
          )}
        </div>

        {isMobile && isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 border-t border-gray-200/50 backdrop-blur-lg">
              <Link href="/" className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">
                Home
              </Link>
              <Link href="/apply" className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">
                Apply as Judge
              </Link>
              <Link href="/blog" className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">
                Blog
              </Link>
              <Link href="/pricing" className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">
                Pricing
              </Link>
              <Link href="/host" className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">
                Host Event
              </Link>
              <div className="px-3 py-3">
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 hover:border-purple-700 transition-all duration-200">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}