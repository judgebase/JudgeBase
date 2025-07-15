import { useEffect, useState } from "react";

const companyLogos = [
  { 
    name: "Google", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    )
  },
  { 
    name: "Apple", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#000000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    )
  },
  { 
    name: "Meta", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  { 
    name: "Amazon", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#FF9900" d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.29-.13.138-.06.234-.06.29.04.058.1.058.22 0 .36-.057.14-.187.31-.39.51-1.96 1.68-4.307 2.84-7.04 3.48-.45.11-.9.17-1.36.17-3.16 0-6.05-.95-8.68-2.84-.34-.25-.45-.55-.34-.83.03-.08.086-.147.145-.206zm2.143-2.249c-.138 0-.23-.15-.23-.31 0-.22.092-.35.23-.35.54-.01 1.08.05 1.62.18.27.06.51.2.68.41.17.21.24.48.18.74-.12.5-.68.83-1.18.83-.54.02-1.080-.05-1.62-.18-.27-.06-.51-.2-.68-.41zm6.565-6.218c-.412-1.072-.617-2.197-.617-3.38 0-1.535.13-3.24.39-5.11.06-.42.3-.63.73-.63.19 0 .35.08.49.25.14.17.21.35.21.55 0 .96-.13 2.15-.39 3.57-.26 1.42-.39 2.55-.39 3.38 0 .34.13.68.39 1.01.26.33.58.56.96.69.91.3 1.88.16 2.91-.42.65-.37 1.148-.858 1.49-1.458.342-.6.513-1.248.513-1.942 0-.965-.171-1.902-.513-2.812-.342-.91-.855-1.677-1.539-2.3-.684-.623-1.539-1.015-2.565-1.175-1.026-.16-2.078-.085-3.156.225-.411.118-.617.412-.617.882 0 .588.205 1.177.617 1.765.412.588.617 1.265.617 2.03 0 .353-.171.618-.513.794-.342.176-.684.235-1.026.176-.342-.059-.616-.235-.822-.529-.206-.294-.309-.647-.309-1.059 0-1.294.445-2.436 1.336-3.426.891-.99 2.078-1.634 3.561-1.932 1.483-.298 2.848-.149 4.095.447 1.247.596 2.234 1.484 2.961 2.665.727 1.181 1.091 2.517 1.091 4.008 0 1.49-.364 2.826-1.091 4.007-.727 1.181-1.714 2.069-2.961 2.665-1.247.596-2.612.745-4.095.447-1.483-.298-2.67-.942-3.561-1.932-.891-.99-1.336-2.132-1.336-3.426 0-.412.103-.765.309-1.059.206-.294.48-.47.822-.529.342-.059.684 0 1.026.176.342.176.513.441.513.794 0 .765-.205 1.442-.617 2.03z"/>
      </svg>
    )
  },
  { 
    name: "Netflix", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#E50914" d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 1.05V24c2.873-.693 4.557-1.108 4.567-1.108-.002-5.164-.117-16.394.024-21.84L5.398 1.05z"/>
      </svg>
    )
  },
  { 
    name: "Microsoft", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#F25022" d="M0 0h11.377v11.372H0z"/>
        <path fill="#7FBA00" d="M12.623 0H24v11.372H12.623z"/>
        <path fill="#00A4EF" d="M0 12.628h11.377V24H0z"/>
        <path fill="#FFB900" d="M12.623 12.628H24V24H12.623z"/>
      </svg>
    )
  },
  { 
    name: "Tesla", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#CC0000" d="M12 5.362L2.4 8.638c0-.448.142-.884.399-1.294L12 0l9.201 7.344c.257.41.399.846.399 1.294L12 5.362zM12 24V11.111l7.6 2.727v3.44C19.6 19.751 16.418 24 12 24zm-7.6-6.722v-3.44L12 11.111V24c-4.418 0-7.6-4.249-7.6-6.722z"/>
      </svg>
    )
  },
  { 
    name: "OpenAI", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#412991" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    )
  }
];

export function LogoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % companyLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 shadow-md mb-8">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">We have judges from</span>
          </div>
          
          {/* Desktop carousel */}
          <div className="hidden md:flex items-center justify-center space-x-8 mb-8">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className={`text-gray-400 font-medium text-base transition-all duration-500 ${
                  index === currentIndex 
                    ? 'scale-110 text-purple-600' 
                    : 'hover:scale-105 hover:text-purple-400'
                }`}
              >
                <div className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center space-y-2 ${
                  index === currentIndex 
                    ? 'border-purple-300 bg-purple-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}>
                  <div className="flex items-center justify-center">{company.logo}</div>
                  <div className="text-sm font-semibold">{company.name}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile carousel */}
          <div className="md:hidden flex items-center justify-center mb-8">
            <div className="text-purple-600 font-medium text-lg">
              <div className="p-4 rounded-lg border-2 border-purple-300 bg-purple-50 shadow-md flex flex-col items-center space-y-2">
                <div className="flex items-center justify-center scale-125">{companyLogos[currentIndex].logo}</div>
                <div className="text-lg font-semibold">{companyLogos[currentIndex].name}</div>
              </div>
            </div>
          </div>
          
          {/* Carousel indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {companyLogos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-gray-300 hover:bg-purple-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to company ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-md border border-purple-100">
            <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">
              🌟 Expert judges from top tech companies
            </p>
            <p className="text-sm text-gray-600">
              Connect with industry leaders who've built products at scale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}