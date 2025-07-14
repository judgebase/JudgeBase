import { JudgeCard } from "./judge-card";

// Static judge data
const featuredJudges = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Product Manager",
    company: "Google",
    location: "San Francisco, CA",
    bio: "Expert in AI/ML product development with 8+ years at leading tech companies.",
    judgingPhilosophy: "Focus on user impact and technical feasibility",
    linkedin: "https://linkedin.com/in/sarah-chen-example",
    twitter: "https://twitter.com/sarahchen",
    website: "https://sarahchen.dev",
    avatar: null,
    expertise: ["AI/ML", "Product Management", "User Experience"],
    experience: "8+ years in product development",
    slug: "sarah-chen",
    status: "approved",
    featured: true,
    badges: ["Top Rated", "AI Expert"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Full Stack Developer",
    company: "Meta",
    location: "Austin, TX",
    bio: "Passionate developer with expertise in React, Node.js, and cloud technologies.",
    judgingPhilosophy: "Emphasis on code quality and scalability",
    linkedin: "https://linkedin.com/in/marcus-rodriguez-example",
    twitter: "https://twitter.com/marcusdev",
    website: "https://marcusrodriguez.com",
    avatar: null,
    expertise: ["React", "Node.js", "Cloud Computing"],
    experience: "6+ years in full-stack development",
    slug: "marcus-rodriguez",
    status: "approved",
    featured: true,
    badges: ["React Expert", "Cloud Specialist"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    title: "Research Scientist",
    company: "MIT",
    location: "Boston, MA",
    bio: "Computer Science researcher specializing in machine learning and data science.",
    judgingPhilosophy: "Values innovation and research potential",
    linkedin: "https://linkedin.com/in/emily-watson-example",
    twitter: "https://twitter.com/emilywatson",
    website: "https://emilywatson.mit.edu",
    avatar: null,
    expertise: ["Machine Learning", "Data Science", "Research"],
    experience: "10+ years in academic research",
    slug: "emily-watson",
    status: "approved",
    featured: true,
    badges: ["PhD", "Research Leader"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
];

export function FeaturedJudges() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Featured Judges
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredJudges.map((judge) => (
            <JudgeCard key={judge.id} judge={judge} />
          ))}
        </div>
      </div>
    </section>
  );
}
