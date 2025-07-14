
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
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Main 3D "J" shape based on the provided logo */}
        <path
          d="M20 15 L20 25 L60 25 L60 40 L60 65 C60 75 55 80 45 80 L35 80 C25 80 20 75 20 65 L20 55 L35 55 L35 65 C35 68 37 70 40 70 L45 70 C48 70 50 68 50 65 L50 40 L35 40 L35 25 L80 25 L80 15 Z"
          fill="url(#logoGradient)"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(124, 58, 237, 0.3))"
          }}
        />
      </svg>
    </div>
  );
}
