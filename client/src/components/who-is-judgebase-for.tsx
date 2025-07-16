import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, Target, Shield } from "lucide-react";

export function WhoIsJudgeBaseFor() {
  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Floating colored sections */}
      <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full opacity-40 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full opacity-40 blur-3xl animate-bounce-soft"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-600 block mb-2">who uses</span>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              judgebase?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Judges Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  Judges
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">Experienced builders, founders, engineers, and creators</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">Looking to share their expertise in high-signal events</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">Get public profile, async judging access, and community</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/apply">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Apply to Judge
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Hackathon Organizers Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-3xl overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  Hackathon Organizers
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">Events that care about quality evaluation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">Looking for vetted judges across domains</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">Get access to curated panels with no spam or cold outreach</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/host">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Request Judges
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}