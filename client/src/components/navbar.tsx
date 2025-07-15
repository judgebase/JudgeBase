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
              href="/find-judges" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Find Judges
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
            >
              Resources
            </Link>
            <Link 
              href="/apply" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 px-4 py-2 rounded-lg font-medium"
            >
              Apply to Judge
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
                href="/find-judges" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Find Judges
              </Link>
              <Link 
                href="/resources" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Resources
              </Link>
              <Link 
                href="/faq" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                FAQ
              </Link>
              <Link 
                href="/support" 
                className="block px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={handleLinkClick}
              >
                Support
              </Link>
              <div className="px-3 py-3">
                <Link 
                  href="/apply"
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white w-full font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm tracking-wide block text-center"
                  onClick={handleLinkClick}
                >
                  ✨ Apply to Judge
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}