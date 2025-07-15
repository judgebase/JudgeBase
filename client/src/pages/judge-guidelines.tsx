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
        title="Judging Expectations - JudgeBase"
        description="Clear guidance for first-time and experienced judges across hackathon events. Learn what judges do, time commitments, and best practices."
        keywords="judging expectations, hackathon judging, judge guidelines, evaluation criteria, judging best practices"
      />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            📋 Judging Expectations
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Judging Expectations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear guidance for first-time and experienced judges across hackathon events
          </p>
        </div>

        <div className="space-y-8">
          {/* What Judges Actually Do */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                What Judges Actually Do
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Judges evaluate submitted projects based on a set of event-specific criteria (e.g., creativity, execution, problem relevance).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>They provide written feedback to help participants improve.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>They help select winning entries, usually through a score-based rubric or ranking method.</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Note:</strong> Every event is different. You'll receive a short judging brief with instructions, scoring sheets, and rubrics before the event starts.
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
              <p className="text-gray-700 mb-4">Most judging processes are remote and async. Here's what to expect:</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Briefing:</strong> ~15–30 minutes before judging starts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Judging:</strong> 1–4 hours depending on number of submissions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700"><strong>Feedback:</strong> ~2–5 minutes per project</span>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800">
                    Judges can usually complete the process at their own pace within a 1–2 day window.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Judging Styles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Judging Styles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We support different types of judging formats:</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Synchronous (Live Demos)</h4>
                  <p className="text-gray-700">Judges attend live pitch sessions or demo calls. Typically used in final rounds.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Asynchronous (Recorded or Submission-Based)</h4>
                  <p className="text-gray-700">Judges receive written submissions, links, videos, or GitHub repos. This is the most common style.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Mixed Format</h4>
                  <p className="text-gray-700">Some events combine live Q&A + async scoring.</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <p className="text-purple-800">
                  Most events are beginner-friendly and prioritize clear ideas over perfect polish.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What Makes a Good Judge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-600" />
                What Makes a Good Judge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You ask smart questions that help the team reflect.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You give actionable feedback (not just scores).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You reward originality, risk-taking, and relevance — not just complexity.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You stay neutral and unbiased across all entries.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You value the journey (not just the end result).</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Not to Do */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-red-600" />
                What Not to Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-red-800">Don't compare submissions to your own past projects.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-red-800">Don't dismiss projects just because they used no-code or simple tech.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-red-800">Don't ignore beginner teams or early-stage ideas.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">✗</span>
                    <span className="text-red-800">Don't judge based on accent, grammar, or presentation polish alone.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code of Conduct */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                Code of Conduct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Keep judging confidential.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Flag any conflicts of interest before the event.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Be respectful, professional, and constructive — even in critical feedback.</span>
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