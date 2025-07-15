import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";

export default function FindJudges() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Find Judges - JudgeBase"
        description="Find expert judges for your hackathon or competition. Connect with qualified professionals to evaluate your event."
        keywords="find judges, hackathon judges, competition judges, expert evaluators"
      />
      
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Expert Judges
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with qualified professionals to evaluate your hackathon or competition.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Our Network</h3>
              <p className="text-gray-600">
                Explore our curated network of expert judges across various industries and technologies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Judges</h3>
              <p className="text-gray-600">
                Choose judges that match your event's theme, industry, and evaluation criteria.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect & Coordinate</h3>
              <p className="text-gray-600">
                We'll help you connect with selected judges and coordinate the evaluation process.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Judge Expertise Areas
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Artificial Intelligence & Machine Learning",
              "Web Development & Frontend",
              "Mobile App Development",
              "Blockchain & Cryptocurrency",
              "Data Science & Analytics",
              "Cybersecurity",
              "Cloud Computing",
              "Game Development",
              "IoT & Hardware",
              "Fintech & Financial Services",
              "HealthTech & Medical",
              "EdTech & Education",
              "E-commerce & Retail",
              "Sustainability & GreenTech",
              "AR/VR & Extended Reality",
              "DevOps & Infrastructure"
            ].map((area, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 font-medium">{area}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to find the perfect judges for your event?
          </p>
          <a 
            href="mailto:hello@judgebase.co" 
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}