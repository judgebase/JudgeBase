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
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-lg mb-8">
        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Trusted by</span>
      </div>
      
      {/* Desktop carousel */}
      <div className="hidden md:flex items-center justify-center space-x-12 mb-8">
        {placeholderLogos.map((logo, index) => (
          <div
            key={index}
            className={`text-gray-400 font-bold text-lg transition-all duration-500 transform ${
              index === currentIndex 
                ? 'scale-125 text-purple-600 shadow-lg' 
                : 'hover:scale-110 hover:text-purple-400'
            }`}
          >
            <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
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
        <div className="text-purple-600 font-bold text-xl">
          <div className="p-6 rounded-xl border-2 border-purple-300 bg-purple-50 shadow-lg">
            {placeholderLogos[currentIndex]}
          </div>
        </div>
      </div>
      
      {/* Enhanced carousel indicators */}
      <div className="flex justify-center space-x-3 mb-8">
        {placeholderLogos.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
              index === currentIndex 
                ? 'bg-purple-500 scale-125 shadow-lg' 
                : 'bg-gray-300 hover:bg-purple-300 hover:scale-110'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to logo ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-purple-100">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          🌟 Trusted by 500+ hackathons worldwide
        </p>
        <p className="text-sm text-gray-600 italic">
          Real partner logos coming soon — join our growing community!
        </p>
      </div>
    </div>
  );
}