import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { judges, hackathons } from './shared/schema.js';
import crypto from 'crypto';

function generateUUID() {
  return crypto.randomUUID();
}

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql);

async function updateDatabase() {
  try {
    // Insert a test judge
    const testJudge = {
      id: generateUUID(),
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc",
      location: "Austin, TX",
      bio: "Passionate software engineer with 8+ years of experience in full-stack development",
      judgingPhilosophy: "I believe in evaluating projects based on innovation, technical execution, and potential impact",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      website: "https://sarahjohnson.dev",
      avatar: null,
      expertise: ["JavaScript", "React", "Node.js", "AI/ML"],
      experience: "8+ years",
      slug: "sarah-johnson",
      status: "approved",
      featured: true,
      badges: ["Full-Stack Expert", "Mentor"]
    };

    await db.insert(judges).values(testJudge);
    console.log('✓ Test judge inserted successfully');

    // Insert a test hackathon
    const testHackathon = {
      id: generateUUID(),
      // Organizer Info
      organizerName: "Mike Chen",
      organizerEmail: "mike.chen@futuretech.org",
      organizationName: "Future Tech Foundation",
      organizerRole: "CTO",
      organizerWebsite: "https://futuretech.org",
      
      // Hackathon Details
      hackathonName: "AI Innovation Challenge 2025",
      hackathonWebsite: "https://ai-challenge-2025.com",
      platform: "Virtual",
      hackathonDates: "March 15-17, 2025",
      judgeDeadline: "March 10, 2025",
      eventFormat: ["Virtual", "Team-based", "Mentorship sessions"],
      participantCount: "150-200",
      isFirstTime: "No",
      
      // Theme & Domains
      theme: "AI for Social Good",
      domains: ["Artificial Intelligence", "Machine Learning", "Social Impact", "Healthcare", "Education"],
      eventSummary: "A 48-hour virtual hackathon focused on developing AI solutions to address real-world social challenges",
      needMentors: "Yes",
      hasExistingJudges: "No",
      
      // Logistics
      deliverables: ["Working prototype", "Presentation slides", "Demo video", "Source code"],
      judgeCount: "6-8",
      timeCommitment: "3-4 hours total",
      
      // Final Notes
      whyJudgeBase: "We need experienced judges with AI/ML expertise for our social impact hackathon",
      additionalNotes: "Looking for judges who can evaluate both technical merit and social impact potential",
      
      status: "approved"
    };

    await db.insert(hackathons).values(testHackathon);
    console.log('✓ Test hackathon inserted successfully');

    console.log('\nTest data inserted successfully!');
    console.log('Judge ID:', testJudge.id);
    console.log('Hackathon ID:', testHackathon.id);
    
  } catch (error) {
    console.error('❌ Database update failed:', error);
  } finally {
    await sql.end();
  }
}

updateDatabase();