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
    <div className="text-center mb-12">
      <p className="text-sm text-gray-500 mb-8 uppercase tracking-wide">Trusted by</p>
      
      {/* Desktop carousel */}
      <div className="hidden md:flex items-center justify-center space-x-8 opacity-60 mb-4">
        {placeholderLogos.map((logo, index) => (
          <div
            key={index}
            className={`text-gray-400 font-semibold transition-all duration-500 ${
              index === currentIndex ? 'scale-110 text-purple-500' : ''
            }`}
          >
            {logo}
          </div>
        ))}
      </div>
      
      {/* Mobile carousel */}
      <div className="md:hidden flex items-center justify-center mb-4">
        <div className="text-gray-400 font-semibold text-purple-500 scale-110">
          {placeholderLogos[currentIndex]}
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="flex justify-center space-x-2 mb-4">
        {placeholderLogos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to logo ${index + 1}`}
          />
        ))}
      </div>
      
      <p className="text-sm text-gray-500 italic">
        Trusted by 500+ hackathons worldwide — real partner logos coming soon.
      </p>
    </div>
  );
}