import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Trophy, Users, Award } from "lucide-react";

export function BeOnPanel() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-10 blur-2xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-10 blur-2xl animate-bounce-soft"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 text-sm animate-pulse-glow">
            🏆 Join Elite Panel
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Be on the{" "}
            <span className="gradient-text-vibrant">Panel</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our curated network of expert judges and help shape the future of innovation at hackathons worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg-cool rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Expert Recognition</h3>
                  <p className="text-gray-600">Build your reputation as a thought leader in your field</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg-warm rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Shape Innovation</h3>
                  <p className="text-gray-600">Mentor the next generation of entrepreneurs and creators</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-bg-vibrant rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Network Growth</h3>
                  <p className="text-gray-600">Connect with fellow experts and innovative teams</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/apply">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white hover:shadow-2xl px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/10 backdrop-blur-sm shadow-xl group">
                  <span className="flex items-center gap-3">
                    🎯 Apply to Judge
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
                  Judge Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
              <CardContent className="p-0">
                <div className="w-12 h-12 gradient-bg mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">200+</div>
                <div className="text-sm text-gray-600">Expert Judges</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-soft">
              <CardContent className="p-0">
                <div className="w-12 h-12 gradient-bg-cool mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-sm text-gray-600">Events Judged</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow">
              <CardContent className="p-0">
                <div className="w-12 h-12 gradient-bg-warm mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
              <CardContent className="p-0">
                <div className="w-12 h-12 gradient-bg-vibrant mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}