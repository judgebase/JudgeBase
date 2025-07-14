import { Link } from "wouter";
import { Logo } from "./logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center mb-4">
              <Logo className="h-8 w-auto mr-2" />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Connecting hackathons with expert judges to create meaningful evaluation experiences and foster innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Judges</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/apply" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  Apply to Judge
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  Judge Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Organizers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/host" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  Host Event
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline">
                  API Access
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-400">
          <p className="text-sm">&copy; {new Date().getFullYear()} JudgeBase. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-sm hover:text-white transition-colors duration-200 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors duration-200 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors duration-200 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}