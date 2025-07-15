import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle, Clock, Users, Award, AlertCircle, BookOpen } from "lucide-react";

export default function JudgeGuidelines() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Judge Guidelines - JudgeBase"
        description="Comprehensive guidelines for judges participating in hackathons through JudgeBase. Learn about expectations, criteria, and best practices."
        keywords="judge guidelines, hackathon judging, evaluation criteria, judging best practices"
      />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            📋 Judge Guidelines
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Judge Guidelines
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about being an effective judge on JudgeBase
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                As a JudgeBase judge, you play a crucial role in shaping the future of innovation. Your expertise and guidance help participants grow, learn, and create meaningful solutions to real-world problems.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Your Impact</h4>
                <p className="text-blue-800">
                  Judges influence not just winners, but the entire hackathon experience. Your feedback shapes how participants approach future projects and their entrepreneurial journey.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Time Commitment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-green-600" />
                Time Commitment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Typical Schedule</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Pre-Event:</strong> 30 minutes briefing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>During Event:</strong> 2-4 hours judging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Post-Event:</strong> 15 minutes feedback</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Flexibility</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Remote judging available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Asynchronous evaluation options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Timezone-friendly scheduling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-600" />
                Evaluation Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Technical Excellence</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Code quality and architecture</li>
                    <li>• Innovation and creativity</li>
                    <li>• Technical difficulty</li>
                    <li>• Scalability potential</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Business Impact</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Problem-solution fit</li>
                    <li>• Market potential</li>
                    <li>• User experience</li>
                    <li>• Presentation quality</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">✓ Do This</h4>
                  <ul className="space-y-1 text-green-800">
                    <li>• Ask thoughtful questions about the problem being solved</li>
                    <li>• Provide specific, actionable feedback</li>
                    <li>• Encourage innovative approaches</li>
                    <li>• Consider the team's learning journey</li>
                    <li>• Be supportive and constructive</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">✗ Avoid This</h4>
                  <ul className="space-y-1 text-red-800">
                    <li>• Comparing projects to your own work</li>
                    <li>• Focusing only on technical perfection</li>
                    <li>• Dismissing ideas without explanation</li>
                    <li>• Being overly critical of presentation skills</li>
                    <li>• Showing bias toward familiar technologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code of Conduct */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
                Code of Conduct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  All JudgeBase judges must maintain the highest standards of professionalism and integrity.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Professional Standards</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Maintain confidentiality of projects</li>
                      <li>• Provide unbiased evaluation</li>
                      <li>• Respect intellectual property</li>
                      <li>• Disclose conflicts of interest</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Community Guidelines</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Foster inclusive environment</li>
                      <li>• Encourage diverse perspectives</li>
                      <li>• Support all participants equally</li>
                      <li>• Maintain respectful communication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Ready to Make an Impact?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  Join our community of expert judges and help shape the future of innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/apply">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Apply to Judge
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button size="lg" variant="outline">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}