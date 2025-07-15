import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { MessageCircle, Mail, Phone, Clock, HelpCircle, Users, Zap } from "lucide-react";

export default function Support() {
  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      availability: "Mon-Fri, 9AM-6PM PST",
      action: "Start Chat"
    },
    {
      title: "Email Support",
      description: "Detailed assistance for complex issues",
      icon: <Mail className="h-8 w-8 text-green-600" />,
      availability: "24/7 - Response within 4 hours",
      action: "Send Email"
    },
    {
      title: "Phone Support",
      description: "Direct line for urgent matters",
      icon: <Phone className="h-8 w-8 text-purple-600" />,
      availability: "Enterprise customers only",
      action: "Schedule Call"
    }
  ];

  const quickHelp = [
    {
      title: "Getting Started",
      description: "New to JudgeBase? Start here",
      icon: <HelpCircle className="h-6 w-6 text-purple-600" />,
      link: "/judge-guidelines"
    },
    {
      title: "FAQ",
      description: "Common questions answered",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      link: "/faq"
    },
    {
      title: "Resources",
      description: "Guides and documentation",
      icon: <Zap className="h-6 w-6 text-green-600" />,
      link: "/resources"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Support - JudgeBase"
        description="Get help with JudgeBase. Contact our support team, access resources, or find answers to common questions."
        keywords="JudgeBase support, help, contact, customer service, technical support"
      />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            🆘 Support
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Can We Help?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to support you every step of the way
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">{option.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4" />
                  {option.availability}
                </div>
                <Button className="w-full">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Help */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Help</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickHelp.map((help, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{help.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{help.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{help.description}</p>
                      <Link href={help.link}>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="judge">Judge Application</SelectItem>
                    <SelectItem value="organizer">Event Organization</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide as much detail as possible..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Status and Updates */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-900">All Systems Operational</span>
                </div>
                <span className="text-sm text-green-700">Last updated: 2 minutes ago</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">API Status</h4>
                  <p className="text-green-600">Operational</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Platform</h4>
                  <p className="text-green-600">Operational</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Database</h4>
                  <p className="text-green-600">Operational</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}