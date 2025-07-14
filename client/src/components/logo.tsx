export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">J</span>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        JudgeBase
      </span>
    </div>
  );
}