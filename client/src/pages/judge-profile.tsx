import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Mail, Globe, Linkedin, Twitter } from "lucide-react";
import { SEO } from "@/components/seo";

export default function JudgeProfile() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: judge, isLoading, error } = useQuery({
    queryKey: ["/api/judges", slug],
    queryFn: async () => {
      const response = await fetch(`/api/judges/${slug}`);
      if (!response.ok) throw new Error('Judge not found');
      return response.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !judge) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Judge Not Found</h2>
              <p className="text-gray-600">The judge profile you're looking for doesn't exist.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${judge.name} - Expert Judge | JudgeBase`}
        description={`${judge.name}, ${judge.title} at ${judge.company}. ${judge.bio.split('.')[0]}.`}
        keywords={`${judge.name}, judge, hackathon, ${judge.expertise.join(', ')}, judgebase`}
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Banner */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                {judge.name.charAt(0)}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold mb-2">{judge.name}</h1>
                <p className="text-xl opacity-90 mb-2">{judge.title}</p>
                <p className="text-lg opacity-80 mb-4">{judge.company}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm opacity-75">
                  <MapPin className="w-4 h-4" />
                  {judge.location}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {judge.bio.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Judging Philosophy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Judging Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {judge.judgingPhilosophy.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {judge.experience.split(', ').map((exp: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Highlight Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {judge.expertise.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {judge.badges.map((badge: string, index: number) => (
                    <Badge key={index} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Socials */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {judge.linkedin && (
                  <a 
                    href={judge.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {judge.website && (
                  <a 
                    href={judge.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                {judge.twitter && (
                  <a 
                    href={judge.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card>
              <CardContent className="pt-6">
                <a 
                  href={`mailto:team@judgebase.co?subject=Judge%20Invite%20for%20${encodeURIComponent(judge.name)}`}
                  className="block"
                >
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">
                    <Mail className="w-4 h-4 mr-2" />
                    Invite to Judge
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
