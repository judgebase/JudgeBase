import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Shield, Database } from "lucide-react";
import { SEO } from "@/components/seo";

export default function Admin() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Admin - JudgeBase"
        description="Admin access for JudgeBase platform management."
        keywords="admin, management, judgebase"
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center">
              <Shield className="w-8 h-8 mr-3 text-purple-600" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <div className="mb-8">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                This is a static website. Admin functionality is not available in the current version.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                For administrative tasks, please contact the system administrator.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Judge Management</h3>
                <p className="text-sm text-gray-600">
                  Judge applications and approvals are handled externally through our forms system.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Content Management</h3>
                <p className="text-sm text-gray-600">
                  Site content and featured judges are managed through the development process.
                </p>
              </div>
            </div>
            
            <a 
              href="mailto:admin@judgebase.co"
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transition-all duration-200 hover:scale-105">
                Contact Administrator
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
