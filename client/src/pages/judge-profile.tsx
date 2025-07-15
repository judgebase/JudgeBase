import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Briefcase, Award, MessageCircle, Calendar } from "lucide-react";
import { SEO } from "@/components/seo";
import { apiRequest } from "@/lib/queryClient";
import type { Judge } from "@shared/schema";

export default function JudgeProfile() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: judge, isLoading, error } = useQuery<Judge>({
    queryKey: ['/api/judges', slug],
    queryFn: () => apiRequest(`/api/judges/${slug}`),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600">Loading judge profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !judge) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Judge Not Found</h1>
            <p className="text-gray-600 mb-6">The judge profile you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/find-judges">Browse All Judges</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${judge.name} - Expert Judge | JudgeBase`}
        description={`${judge.name} is an expert judge at ${judge.company}. ${judge.bio.substring(0, 150)}...`}
        ogTitle={`${judge.name} - Expert Judge`}
        ogDescription={judge.bio.substring(0, 150)}
      />
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-green-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                {judge.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{judge.name}</h1>
              <p className="text-xl mb-4 text-white/90">{judge.title}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{judge.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{judge.location}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {judge.linkedin && (
                  <Button variant="outline" size="sm" asChild className="bg-white/10 border-white/20 hover:bg-white/20">
                    <a href={judge.linkedin} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {judge.twitter && (
                  <Button variant="outline" size="sm" asChild className="bg-white/10 border-white/20 hover:bg-white/20">
                    <a href={judge.twitter} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                )}
                {judge.website && (
                  <Button variant="outline" size="sm" asChild className="bg-white/10 border-white/20 hover:bg-white/20">
                    <a href={judge.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  About {judge.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{judge.bio}</p>
              </CardContent>
            </Card>

            {/* Judging Philosophy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Judging Philosophy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{judge.judgingPhilosophy}</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{judge.experience}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expertise Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Expertise Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {judge.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            {judge.badges.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {judge.badges.map((badge, index) => (
                      <Badge key={index} variant="outline" className="w-full justify-center py-2">
                        <Award className="w-4 h-4 mr-2" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Featured</span>
                  <span className="text-gray-900">{judge.featured ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined</span>
                  <span className="text-gray-900">{new Date(judge.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Want to connect?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">
                  Connect with {judge.name} on their professional networks or reach out through JudgeBase.
                </p>
                <div className="space-y-2">
                  {judge.linkedin && (
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href={judge.linkedin} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                    <a href="/host">Request as Judge</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}