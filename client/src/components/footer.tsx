import { Link } from "wouter";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-bold">JudgeBase</span>
          </Link>
          <div className="flex items-center space-x-6">
            <a
              href="#discord"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Discord
            </a>
            <a
              href="mailto:contact@judgebase.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
