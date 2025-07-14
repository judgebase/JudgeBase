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
