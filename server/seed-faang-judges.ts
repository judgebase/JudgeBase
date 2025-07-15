import { PostgresStorage } from './db';
import type { NewJudge } from '@shared/schema';

const storage = new PostgresStorage();

const faangJudges: NewJudge[] = [
  {
    name: "Sarah Chen",
    title: "Senior Product Manager",
    company: "Google",
    location: "Mountain View, CA",
    bio: "Leading product development for Google Cloud AI/ML services with 8+ years of experience in tech product management. Passionate about helping startups leverage AI/ML technologies effectively.",
    judgingPhilosophy: "I evaluate projects based on technical innovation, market potential, and user impact. I look for teams that demonstrate deep understanding of their problem space and present scalable solutions.",
    linkedin: "https://linkedin.com/in/sarahchen-google",
    twitter: "https://twitter.com/sarahchen_pm",
    website: "https://sarahchen.dev",
    avatar: null,
    expertise: ["AI/ML", "Product Management", "Cloud Computing", "Startups"],
    experience: "8+ years at Google, previously at startups. Has judged 15+ hackathons including Google I/O Developer Challenge.",
    slug: "sarah-chen-google",
    status: "approved",
    featured: true,
    badges: ["FAANG", "AI Expert", "Product Lead"]
  },
  {
    name: "Marcus Rodriguez",
    title: "Senior Software Engineer",
    company: "Meta",
    location: "Menlo Park, CA",
    bio: "Full-stack engineer working on Meta's core infrastructure platforms. Expertise in distributed systems, React, and mobile development. Active mentor in the tech community.",
    judgingPhilosophy: "I focus on code quality, system architecture, and scalability. I appreciate teams that show strong technical fundamentals and think about long-term maintainability.",
    linkedin: "https://linkedin.com/in/marcusrodriguez-meta",
    twitter: "https://twitter.com/marcus_codes",
    website: "https://marcusdev.io",
    avatar: null,
    expertise: ["Full Stack Development", "React", "Mobile Development", "Distributed Systems"],
    experience: "6+ years at Meta, previously at Microsoft. Regular hackathon judge and mentor at startup accelerators.",
    slug: "marcus-rodriguez-meta",
    status: "approved",
    featured: true,
    badges: ["FAANG", "Full Stack", "Mobile Expert"]
  },
  {
    name: "Jennifer Kim",
    title: "Principal Engineer",
    company: "Amazon",
    location: "Seattle, WA",
    bio: "Leading engineering teams at Amazon Web Services focusing on serverless computing and microservices architecture. Strong advocate for open source and developer tools.",
    judgingPhilosophy: "I value clean architecture, proper use of cloud services, and solutions that demonstrate understanding of scale. I look for projects that solve real problems efficiently.",
    linkedin: "https://linkedin.com/in/jenniferkim-aws",
    twitter: "https://twitter.com/jen_codes_aws",
    website: "https://jenkim.engineering",
    avatar: null,
    expertise: ["Cloud Computing", "Serverless", "Microservices", "DevOps"],
    experience: "10+ years at Amazon, expert in AWS services. Has judged AWS hackathons and startup pitch competitions.",
    slug: "jennifer-kim-amazon",
    status: "approved",
    featured: true,
    badges: ["FAANG", "Cloud Expert", "AWS Specialist"]
  },
  {
    name: "David Park",
    title: "Senior Data Scientist",
    company: "Netflix",
    location: "Los Gatos, CA",
    bio: "Data scientist working on Netflix's recommendation algorithms and content optimization. PhD in Machine Learning from Stanford. Passionate about applied ML and data-driven decision making.",
    judgingPhilosophy: "I evaluate projects on data quality, model performance, and practical applicability. I appreciate teams that show strong analytical thinking and present clear metrics.",
    linkedin: "https://linkedin.com/in/davidpark-netflix",
    twitter: "https://twitter.com/david_ml_data",
    website: "https://davidpark.ml",
    avatar: null,
    expertise: ["Machine Learning", "Data Science", "Recommendation Systems", "Analytics"],
    experience: "7+ years at Netflix, previously at Google. PhD in ML. Regular speaker at ML conferences and hackathon judge.",
    slug: "david-park-netflix",
    status: "approved",
    featured: true,
    badges: ["FAANG", "ML Expert", "Data Scientist"]
  },
  {
    name: "Lisa Wang",
    title: "iOS Engineering Manager",
    company: "Apple",
    location: "Cupertino, CA",
    bio: "Engineering manager for Apple's iOS development tools and frameworks. 12+ years of iOS development experience. Strong advocate for accessibility and inclusive design.",
    judgingPhilosophy: "I focus on user experience, code quality, and innovative use of platform features. I value teams that prioritize accessibility and demonstrate attention to detail.",
    linkedin: "https://linkedin.com/in/lisawang-apple",
    twitter: "https://twitter.com/lisa_ios_dev",
    website: "https://lisawang.dev",
    avatar: null,
    expertise: ["iOS Development", "Swift", "Mobile UX", "Accessibility"],
    experience: "12+ years at Apple, previously at startups. Regular judge at mobile app competitions and hackathons.",
    slug: "lisa-wang-apple",
    status: "approved",
    featured: true,
    badges: ["FAANG", "iOS Expert", "Mobile Leader"]
  },
  {
    name: "Alex Thompson",
    title: "Research Scientist",
    company: "OpenAI",
    location: "San Francisco, CA",
    bio: "Research scientist at OpenAI working on large language models and AI safety. PhD in Computer Science from MIT. Focused on making AI more accessible and beneficial.",
    judgingPhilosophy: "I evaluate projects on technical innovation, responsible AI practices, and potential societal impact. I look for teams that understand both the capabilities and limitations of AI.",
    linkedin: "https://linkedin.com/in/alexthompson-openai",
    twitter: "https://twitter.com/alex_ai_research",
    website: "https://alexthompson.ai",
    avatar: null,
    expertise: ["Artificial Intelligence", "Large Language Models", "AI Safety", "Research"],
    experience: "4+ years at OpenAI, previously at Google DeepMind. PhD in CS. Regular reviewer for AI conferences and hackathons.",
    slug: "alex-thompson-openai",
    status: "approved",
    featured: true,
    badges: ["AI Pioneer", "Research Leader", "OpenAI"]
  },
  {
    name: "Priya Patel",
    title: "Staff Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    bio: "Staff engineer at Google working on Search infrastructure and distributed systems. Expert in performance optimization and large-scale system design.",
    judgingPhilosophy: "I focus on system design, scalability, and performance. I appreciate teams that show deep technical understanding and consider real-world constraints.",
    linkedin: "https://linkedin.com/in/priyapatel-google",
    twitter: "https://twitter.com/priya_systems",
    website: "https://priyapatel.engineering",
    avatar: null,
    expertise: ["Distributed Systems", "Performance Optimization", "System Design", "Search"],
    experience: "9+ years at Google, previously at LinkedIn. Expert in large-scale systems. Regular mentor and hackathon judge.",
    slug: "priya-patel-google",
    status: "approved",
    featured: true,
    badges: ["FAANG", "Systems Expert", "Performance Guru"]
  },
  {
    name: "Ryan Mitchell",
    title: "Senior Security Engineer",
    company: "Meta",
    location: "Austin, TX",
    bio: "Security engineer at Meta specializing in application security and threat detection. CISSP certified with expertise in secure coding practices and vulnerability assessment.",
    judgingPhilosophy: "I evaluate projects on security architecture, threat modeling, and secure coding practices. I value teams that consider security from the ground up.",
    linkedin: "https://linkedin.com/in/ryanmitchell-meta",
    twitter: "https://twitter.com/ryan_security",
    website: "https://ryansecurity.dev",
    avatar: null,
    expertise: ["Cybersecurity", "Application Security", "Threat Detection", "Secure Coding"],
    experience: "8+ years at Meta, previously at Microsoft. CISSP certified. Regular speaker at security conferences and hackathon judge.",
    slug: "ryan-mitchell-meta",
    status: "approved",
    featured: true,
    badges: ["FAANG", "Security Expert", "CISSP"]
  }
];

export async function seedFaangJudges() {
  console.log('Seeding FAANG judges...');
  
  for (const judge of faangJudges) {
    try {
      // Check if judge already exists
      const existingJudge = await storage.getJudgeBySlug(judge.slug);
      if (!existingJudge) {
        await storage.createJudge(judge);
        console.log(`✓ Created judge: ${judge.name} (${judge.company})`);
      } else {
        console.log(`- Judge already exists: ${judge.name} (${judge.company})`);
      }
    } catch (error) {
      console.error(`✗ Error creating judge ${judge.name}:`, error);
    }
  }
  
  console.log('FAANG judges seeding completed');
}

// Run if called directly
if (require.main === module) {
  seedFaangJudges()
    .then(() => {
      console.log('Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}