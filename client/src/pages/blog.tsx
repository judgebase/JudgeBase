import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { SEO } from "@/components/seo";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Hackathon Judging: Best Practices for 2025",
    excerpt: "Learn the essential strategies and criteria that top judges use to evaluate hackathon projects effectively and fairly.",
    author: "Sarah Chen",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2025-01-10",
    readTime: "8 min read",
    category: "Best Practices",
    tags: ["Judging", "Hackathon", "Guide"],
    featured: true,
    slug: "ultimate-guide-hackathon-judging-2025"
  },
  {
    id: 2,
    title: "Building Diverse Judge Panels: Why Representation Matters",
    excerpt: "Discover how diverse judge panels lead to better outcomes and more innovative solutions in hackathons.",
    author: "Marcus Rodriguez",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2025-01-08",
    readTime: "6 min read",
    category: "Diversity",
    tags: ["Diversity", "Inclusion", "Best Practices"],
    featured: false,
    slug: "building-diverse-judge-panels"
  },
  {
    id: 3,
    title: "Remote vs. In-Person Judging: Pros, Cons, and Best Practices",
    excerpt: "A comprehensive comparison of remote and in-person judging formats with practical tips for both.",
    author: "Elena Kowalski",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2025-01-05",
    readTime: "7 min read",
    category: "Format",
    tags: ["Remote", "In-Person", "Logistics"],
    featured: false,
    slug: "remote-vs-in-person-judging"
  },
  {
    id: 4,
    title: "AI & Machine Learning Hackathons: What Judges Look For",
    excerpt: "Expert insights into evaluating AI/ML projects and the key criteria that matter most.",
    author: "Dr. Raj Patel",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2025-01-03",
    readTime: "9 min read",
    category: "AI/ML",
    tags: ["AI", "Machine Learning", "Evaluation"],
    featured: true,
    slug: "ai-ml-hackathons-judging-criteria"
  },
  {
    id: 5,
    title: "Startup Pitch Judging: Beyond the Demo",
    excerpt: "How to evaluate startup pitches at hackathons focusing on viability, market potential, and team dynamics.",
    author: "Jessica Park",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2025-01-01",
    readTime: "5 min read",
    category: "Startups",
    tags: ["Startups", "Pitching", "Evaluation"],
    featured: false,
    slug: "startup-pitch-judging-beyond-demo"
  },
  {
    id: 6,
    title: "The Psychology of Fair Judging: Avoiding Bias in Hackathons",
    excerpt: "Understanding cognitive biases and implementing strategies to ensure fair and objective evaluation.",
    author: "Dr. Amy Watson",
    authorAvatar: "/api/placeholder/40/40",
    publishedAt: "2024-12-28",
    readTime: "10 min read",
    category: "Psychology",
    tags: ["Psychology", "Bias", "Fair Judging"],
    featured: false,
    slug: "psychology-fair-judging-avoiding-bias"
  }
];

const categories = ["All", "Best Practices", "Diversity", "Format", "AI/ML", "Startups", "Psychology"];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "JudgeBase Blog",
    "description": "Expert insights on hackathon judging, best practices, and industry trends",
    "url": "https://judgebase.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "JudgeBase",
      "logo": {
        "@type": "ImageObject",
        "url": "https://judgebase.com/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <SEO
        title="Expert Insights on Hackathon Judging"
        description="Get expert insights on hackathon judging, best practices, and industry trends from JudgeBase's curated network of professional judges."
        keywords="hackathon judging, judge training, hackathon best practices, judging criteria, expert judges, hackathon guides"
        ogTitle="JudgeBase Blog - Expert Insights on Hackathon Judging"
        ogDescription="Get expert insights on hackathon judging, best practices, and industry trends from JudgeBase's curated network of professional judges."
        structuredData={blogStructuredData}
        canonical="https://judgebase.com/blog"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Latest Insights</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Expert Insights on{" "}
            <span className="gradient-text">Hackathon Judging</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Learn from the best. Get actionable insights, best practices, and industry trends 
            from our curated network of professional judges.
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 border-purple-200 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "gradient-bg text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-purple-100 animate-float">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="gradient-bg text-white">Featured</Badge>
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-3 hover:text-purple-600 transition-colors">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.authorAvatar} alt={post.author} />
                          <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{post.author}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                            <Clock className="h-3 w-3 ml-2" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-bounce-soft">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-3 hover:text-purple-600 transition-colors">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <p className="text-gray-600 line-clamp-2 text-sm">{post.excerpt}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback className="text-xs">{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-xs text-gray-900">{post.author}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <div className="flex gap-1 mt-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Join Our Judge Network?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Share your expertise, contribute to the community, and help shape the future of innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold">
                  Apply to Judge
                </Button>
              </Link>
              <Link href="/host">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold">
                  Host an Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}