import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, Users, Star } from "lucide-react";
import { SEO } from "@/components/seo";

export default function Host() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Host Event - JudgeBase"
        description="Host your hackathon or competition with expert judges from JudgeBase."
        keywords="host hackathon, competition organizer, expert judges, event hosting"
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Host Your Event with Expert Judges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with qualified judges to elevate your hackathon or competition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Expert Judge Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access our curated network of industry professionals with expertise across various technologies and domains.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Flexible Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our judges can accommodate various event formats including live judging, asynchronous evaluation, and hybrid approaches.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Quality Assurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All judges are vetted for their expertise and experience, ensuring high-quality evaluation for your participants.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                Dedicated Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get personalized support throughout the entire process, from judge selection to post-event coordination.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Ready to Get Started?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-6">
              Contact us to discuss your event requirements and find the perfect judges for your hackathon or competition.
            </p>
            <a 
              href="mailto:hello@judgebase.co"
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}