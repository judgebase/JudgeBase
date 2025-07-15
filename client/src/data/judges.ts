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

export const judges: Judge[] = [];

export const getFeaturedJudges = (): Judge[] => {
  return judges.filter(judge => judge.featured && judge.status === 'approved');
};

export const getJudgeBySlug = (slug: string): Judge | undefined => {
  return judges.find(judge => judge.slug === slug);
};

export const getAllJudges = (): Judge[] => {
  return judges.filter(judge => judge.status === 'approved');
};