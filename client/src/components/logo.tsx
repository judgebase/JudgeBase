
export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Modern 3D "J" shape */}
        <path
          d="M25 20 L25 60 C25 70 30 75 40 75 L50 75 C60 75 65 70 65 60 L65 45 L50 45 L50 55 L45 55 L45 60 C45 62 43 64 40 64 L40 64 C37 64 35 62 35 60 L35 20 Z"
          fill="url(#logoGradient)"
        />
        {/* Side accent */}
        <path
          d="M70 30 L70 50 C70 55 73 58 78 58 L78 58 C83 58 86 55 86 50 L86 30 Z"
          fill="url(#logoGradient)"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
