import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, Key, Zap, Shield, Clock } from "lucide-react";

export default function ApiAccess() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/judges",
      description: "Retrieve all approved judges",
      example: "curl -X GET 'https://judgebase.co/api/judges' -H 'Authorization: Bearer YOUR_TOKEN'"
    },
    {
      method: "GET",
      path: "/api/judges/featured",
      description: "Get featured judges for homepage display",
      example: "curl -X GET 'https://judgebase.co/api/judges/featured' -H 'Authorization: Bearer YOUR_TOKEN'"
    },
    {
      method: "GET",
      path: "/api/judges/{slug}",
      description: "Get specific judge by slug",
      example: "curl -X GET 'https://judgebase.co/api/judges/rishulchanana' -H 'Authorization: Bearer YOUR_TOKEN'"
    },
    {
      method: "POST",
      path: "/api/judges/request",
      description: "Request judges for your event",
      example: "curl -X POST 'https://judgebase.co/api/judges/request' -H 'Authorization: Bearer YOUR_TOKEN' -H 'Content-Type: application/json' -d '{\"event_name\": \"My Hackathon\", \"date\": \"2025-03-15\", \"participants\": 100}'"
    }
  ];

  const features = [
    {
      title: "RESTful API",
      description: "Clean, predictable endpoints with standard HTTP methods",
      icon: <Database className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Authentication",
      description: "Secure API key authentication with rate limiting",
      icon: <Shield className="h-8 w-8 text-green-600" />
    },
    {
      title: "Real-time Updates",
      description: "WebSocket support for live judge availability",
      icon: <Zap className="h-8 w-8 text-purple-600" />
    },
    {
      title: "99.9% Uptime",
      description: "Reliable infrastructure with comprehensive monitoring",
      icon: <Clock className="h-8 w-8 text-orange-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="API Access - JudgeBase"
        description="Integrate JudgeBase with your platform using our REST API. Access judge data, request judges, and manage events programmatically."
        keywords="JudgeBase API, REST API, judge data API, integration, developers"
      />
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2">
            🔌 API Access
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            JudgeBase API
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate judge management into your platform with our comprehensive API
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Getting Started */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-6 w-6 text-purple-600" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Get API Key</h3>
                  <p className="text-sm text-gray-600">Register for an account and generate your API key</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Make Request</h3>
                  <p className="text-sm text-gray-600">Include your API key in the Authorization header</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Integrate</h3>
                  <p className="text-sm text-gray-600">Build amazing experiences with judge data</p>
                </div>
              </div>
              
              <div className="bg-gray-900 text-gray-100 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 text-green-400">Base URL:</h4>
                <code className="block bg-gray-800 p-3 rounded text-sm">
                  https://api.judgebase.co/v1
                </code>
                
                <h4 className="font-semibold mb-4 mt-6 text-green-400">Authentication:</h4>
                <code className="block bg-gray-800 p-3 rounded text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-6 w-6 text-blue-600" />
              API Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant={endpoint.method === 'GET' ? 'default' : 'destructive'}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {endpoint.path}
                    </code>
                  </div>
                  <p className="text-gray-700 mb-3">{endpoint.description}</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <code className="text-sm whitespace-pre-wrap">{endpoint.example}</code>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rate Limits */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Rate Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Free Tier</h3>
                <p className="text-2xl font-bold text-green-600 mb-1">100</p>
                <p className="text-sm text-green-700">requests/hour</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Pro Tier</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">1,000</p>
                <p className="text-sm text-blue-700">requests/hour</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Enterprise</h3>
                <p className="text-2xl font-bold text-purple-600 mb-1">Custom</p>
                <p className="text-sm text-purple-700">unlimited</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SDK and Libraries */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>SDKs & Libraries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-semibold mb-2">JavaScript</h4>
                <code className="text-sm">npm install judgebase</code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Python</h4>
                <code className="text-sm">pip install judgebase</code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-semibold mb-2">PHP</h4>
                <code className="text-sm">composer require judgebase</code>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <h4 className="font-semibold mb-2">Go</h4>
                <code className="text-sm">go get judgebase</code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Started */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Ready to Get Started?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                Join thousands of developers using JudgeBase API to power their events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Get API Key
                </Button>
                <Button size="lg" variant="outline">
                  View Documentation
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