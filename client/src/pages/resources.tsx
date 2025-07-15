import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, Download, Video, FileText, ExternalLink, Users, Award, Clock } from "lucide-react";

export default function Resources() {
  const resourceCategories = [
    {
      title: "Judge Training Materials",
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      resources: [
        {
          title: "Judge Handbook",
          description: "Complete guide to effective hackathon judging",
          type: "PDF",
          icon: <FileText className="h-5 w-5" />,
          link: "#"
        },
        {
          title: "Evaluation Frameworks",
          description: "Templates and rubrics for consistent judging",
          type: "Template",
          icon: <Download className="h-5 w-5" />,
          link: "#"
        },
        {
          title: "Best Practices Video",
          description: "30-minute training on effective judging techniques",
          type: "Video",
          icon: <Video className="h-5 w-5" />,
          link: "#"
        }
      ]
    },
    {
      title: "Organizer Resources",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      resources: [
        {
          title: "Event Planning Guide",
          description: "Step-by-step hackathon organization checklist",
          type: "Guide",
          icon: <FileText className="h-5 w-5" />,
          link: "#"
        },
        {
          title: "Judge Briefing Templates",
          description: "Pre-event briefing materials for judges",
          type: "Template",
          icon: <Download className="h-5 w-5" />,
          link: "#"
        },
        {
          title: "Scoring Sheets",
          description: "Standardized evaluation forms",
          type: "Template",
          icon: <Download className="h-5 w-5" />,
          link: "#"
        }
      ]
    },
    {
      title: "Technical Resources",
      icon: <Award className="h-6 w-6 text-green-600" />,
      resources: [
        {
          title: "API Documentation",
          description: "Integrate JudgeBase with your event platform",
          type: "Documentation",
          icon: <ExternalLink className="h-5 w-5" />,
          link: "/api-access"
        },
        {
          title: "Integration Examples",
          description: "Code samples for common integrations",
          type: "Code",
          icon: <Download className="h-5 w-5" />,
          link: "#"
        },
        {
          title: "Platform Status",
          description: "Real-time platform status and updates",
          type: "Status",
          icon: <ExternalLink className="h-5 w-5" />,
          link: "#"
        }
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Getting Started",
      description: "New to JudgeBase? Start here",
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      link: "/judge-guidelines"
    },
    {
      title: "FAQ",
      description: "Common questions answered",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      link: "/faq"
    },
    {
      title: "Support",
      description: "Get help when you need it",
      icon: <Users className="h-8 w-8 text-green-600" />,
      link: "/support"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Resources - JudgeBase"
        description="Access comprehensive resources for judges and organizers. Download guides, templates, and training materials."
        keywords="judge resources, hackathon materials, judging templates, event planning guides"
      />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            📚 Resources
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed as a judge or organizer
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">{link.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                <p className="text-gray-600 mb-4">{link.description}</p>
                <Link href={link.link}>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resource Categories */}
        <div className="space-y-8">
          {resourceCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="text-gray-500 mt-1">{resource.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="outline" className="w-full">
                          Access Resource
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Training Schedule */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-600" />
              Upcoming Training Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-blue-900">Judge Onboarding Workshop</h4>
                  <p className="text-sm text-blue-700">Essential skills for new judges</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-700">Next: Jan 25, 2025</p>
                  <Button size="sm" className="mt-2">Register</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-green-900">Advanced Evaluation Techniques</h4>
                  <p className="text-sm text-green-700">For experienced judges</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-700">Next: Feb 8, 2025</p>
                  <Button size="sm" className="mt-2">Register</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-purple-900">Organizer Best Practices</h4>
                  <p className="text-sm text-purple-700">Maximize your event's success</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-700">Next: Feb 15, 2025</p>
                  <Button size="sm" className="mt-2">Register</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Join Our Community</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                Connect with other judges and organizers. Share experiences, get advice, and stay updated.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Join Slack Community
                </Button>
                <Button size="lg" variant="outline">
                  Follow on LinkedIn
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}