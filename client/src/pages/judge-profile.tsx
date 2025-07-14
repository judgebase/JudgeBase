import { useEffect } from "react";
import { useParams } from "wouter";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SEO } from "@/components/seo";

export default function JudgeProfile() {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Redirect to external judge profile immediately
    if (slug) {
      window.location.href = `https://judgebase.co/${slug}`;
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${slug ? slug.replace('-', ' ') : 'Judge Profile'} - JudgeBase`}
        description={`View detailed profile and expertise for ${slug ? slug.replace('-', ' ') : 'our judge'}.`}
        keywords="judge profile, expert judge, hackathon judge, judgebase"
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Judge Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 mb-6">
              Redirecting you to the judge's profile...
            </p>
            <p className="text-sm text-gray-500 mb-8">
              If you're not redirected automatically, click the button below.
            </p>
            <a 
              href={`https://judgebase.co/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Judge Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}

  if (error || !judge) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-12 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Judge Not Found
                </h1>
                <p className="text-gray-600">
                  The judge profile you're looking for doesn't exist or may have been removed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const badgeColors = {
    "judge of the month": "bg-purple-100 text-purple-800",
    "participant favorite": "bg-blue-100 text-blue-800",
    "rising judge": "bg-green-100 text-green-800",
    "founder's pick": "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Profile Card */}
          <Card className="mb-8">
            <CardContent className="p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={judge.avatar || undefined}
                    alt={`${judge.name} profile picture`}
                  />
                  <AvatarFallback className="text-4xl font-semibold bg-gradient-to-br from-purple-100 to-blue-100">
                    {judge.name ? judge.name.split(" ").map(n => n[0]).join("") : "JB"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {judge.name || 'Anonymous Judge'}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">{judge.title || 'Judge'}</p>
                  
                  {judge.badges && judge.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                      {judge.badges.map((badge) => (
                        <Badge
                          key={badge}
                          className={badgeColors[badge as keyof typeof badgeColors] || "bg-gray-100 text-gray-800"}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {judge.bio && (
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      {judge.bio}
                    </p>
                  )}
                  
                  <div className="flex gap-4 justify-center md:justify-start">
                    {judge.linkedin && (
                      <a
                        href={judge.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <LinkedinIcon className="w-5 h-5" />
                        LinkedIn
                      </a>
                    )}
                    {judge.twitter && (
                      <a
                        href={judge.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <TwitterIcon className="w-5 h-5" />
                        Twitter
                      </a>
                    )}
                    {judge.website && (
                      <a
                        href={judge.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        <Globe className="w-5 h-5" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Judging Philosophy */}
          {judge.judgingPhilosophy && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Judging Philosophy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {judge.judgingPhilosophy}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Experience */}
          {judge.experience && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Experience
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {judge.experience}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Contact */}
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Interested in working together?
              </h2>
              <p className="text-gray-600 mb-6">
                Get in touch to discuss your hackathon or project.
              </p>
              <Button
                className="gradient-bg text-white"
                onClick={() => window.open(`mailto:${judge.email}`, '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact {judge.name.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
