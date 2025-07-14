export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`gradient-bg rounded-lg flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20 L20 80 L35 80 L35 50 L50 50 L50 35 L65 35 L65 65 L80 65 L80 20 Z"
          fill="white"
          stroke="none"
        />
      </svg>
    </div>
  );
}
