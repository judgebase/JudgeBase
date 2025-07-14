export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="/attached_assets/ChatGPT_Image_Jul_14__2025__11_32_05_PM-removebg-preview_1752522923713.png" 
        alt="JudgeBase Logo" 
        className="w-8 h-8"
      />
      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        JudgeBase
      </span>
    </div>
  );
}