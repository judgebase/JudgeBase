import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={handleLinkClick}>
            <Logo className="h-9 w-auto" />
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              JudgeBase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/apply" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Apply as Judge
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
            <Link 
              href="/pricing" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Pricing
            </Link>
            <Link 
              href="/host" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Host Event
            </Link>
            <Link href="/apply">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200">
                Apply to Judge
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link 
                href="/apply" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Apply as Judge
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Blog
              </Link>
              <Link 
                href="/pricing" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Pricing
              </Link>
              <Link 
                href="/host" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Host Event
              </Link>
              <div className="px-3 py-3">
                <Link href="/apply" onClick={handleLinkClick}>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full">
                    Apply to Judge
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}