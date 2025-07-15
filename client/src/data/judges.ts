// Static judge data for the frontend
export interface Judge {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  judgingPhilosophy: string;
  linkedin: string;
  twitter: string;
  website: string;
  avatar: string | null;
  expertise: string[];
  experience: string;
  slug: string;
  status: string;
  featured: boolean;
  badges: string[];
  createdAt: string;
  updatedAt: string;
}

export const judges: Judge[] = [
  {
    id: '1',
    name: 'Rishul Chanana',
    title: 'Founder & CEO',
    company: 'Maximally',
    location: 'Chandigarh, India',
    bio: 'Rishul is a 16-year-old dropout-turned-founder from Zirakpur who\'s dead serious about one thing: execution. He runs Maximally, India\'s first high-stakes hackathon ecosystem designed for teenagers who\'d rather build than cram.\n\nHe doesn\'t do lectures or checkboxes. His events feel more like Red Bull meets YC — fast, chaotic, and real. His past hackathons have brought in thousands of young builders, and he\'s landed partnerships with orgs like Masters\' Union to back the movement.\n\nRishul\'s belief is simple: hackathons aren\'t events. They\'re engines. Engines for discovery, for proof, and for transformation.',
    judgingPhilosophy: 'I reward speed, not theory. I care about clarity, not complexity. The best builds are sharp, raw, and unapologetically weird.\n\nRishul judges with a "ship-first" lens — he prioritizes MVPs over mockups, originality over polish, and founder energy over fancy slides.',
    linkedin: 'https://linkedin.com/in/rishulchanana',
    twitter: '',
    website: 'https://maximally.in',
    avatar: null,
    expertise: ['Hackathons', 'Startup Ecosystem', 'Youth Entrepreneurship'],
    experience: 'Head Judge – CodeQuest (India\'s largest school hackathon), Judge & Mentor – Maximally Startup Makeathon, Advisor – Startup World Tapri, Consultant – PurpleRain TechSafe, Builder – HackSkye (4000+ student event)',
    slug: 'rishulchanana',
    status: 'approved',
    featured: true,
    badges: ['Startup Mentor', 'Youth Leader', 'Hackathon Expert'],
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
];

export const getFeaturedJudges = (): Judge[] => {
  return judges.filter(judge => judge.featured && judge.status === 'approved');
};

export const getJudgeBySlug = (slug: string): Judge | undefined => {
  return judges.find(judge => judge.slug === slug);
};

export const getAllJudges = (): Judge[] => {
  return judges.filter(judge => judge.status === 'approved');
};