import { useEffect, useState } from "react";

const placeholderLogos = [
  "Logo 1",
  "Logo 2", 
  "Logo 3",
  "Logo 4",
  "Logo 5",
  "Logo 6"
];

export function LogoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-md mb-8">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">Trusted by</span>
          </div>
          
          {/* Desktop carousel */}
          <div className="hidden md:flex items-center justify-center space-x-8 mb-8">
            {placeholderLogos.map((logo, index) => (
              <div
                key={index}
                className={`text-gray-400 font-medium text-base transition-all duration-500 ${
                  index === currentIndex 
                    ? 'scale-110 text-purple-600' 
                    : 'hover:scale-105 hover:text-purple-400'
                }`}
              >
                <div className={`p-3 rounded-lg border transition-all duration-300 ${
                  index === currentIndex 
                    ? 'border-purple-300 bg-purple-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}>
                  {logo}
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile carousel */}
          <div className="md:hidden flex items-center justify-center mb-8">
            <div className="text-purple-600 font-medium text-lg">
              <div className="p-4 rounded-lg border-2 border-purple-300 bg-purple-50 shadow-md">
                {placeholderLogos[currentIndex]}
              </div>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {placeholderLogos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-purple-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to logo ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md border border-purple-100">
            <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">
              🌟 Trusted by 500+ hackathons worldwide
            </p>
            <p className="text-sm text-gray-600">
              Real partner logos coming soon — join our growing community!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}