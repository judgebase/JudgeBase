import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { EmailService } from './server/email.js';

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql);

const emailService = new EmailService();

// Test data
const testHackathon = {
  id: "test-hackathon-id",
  hackathonName: "Test Hackathon 2025",
  organizationName: "Test Organization",
  organizerName: "John Doe",
  organizerEmail: "john.doe@example.com",
  hackathonDates: "March 15-17, 2025",
  platform: "Virtual",
  theme: "AI for Good",
  eventSummary: "A hackathon focused on AI solutions for social good",
  judgeDeadline: "March 10, 2025",
  participantCount: "100-200",
  judgeCount: "5-8",
  timeCommitment: "2-3 hours",
  domains: ["AI", "Social Impact", "Healthcare"],
  eventFormat: ["Virtual", "Team-based"],
  deliverables: ["Working prototype", "Presentation", "Code repository"]
};

const testJudge = {
  id: "test-judge-id",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  title: "Senior AI Engineer",
  company: "Tech Corp",
  location: "San Francisco, CA",
  bio: "Experienced AI engineer with 10+ years in the field",
  judgingPhilosophy: "Focus on innovation and technical excellence",
  linkedin: "https://linkedin.com/in/janesmith",
  twitter: "https://twitter.com/janesmith",
  website: "https://janesmith.dev",
  expertise: ["AI", "Machine Learning", "Python"],
  experience: "10+ years",
  slug: "jane-smith",
  status: "approved",
  featured: true,
  badges: ["AI Expert", "Mentor"]
};

async function testEmailFunctionality() {
  try {
    console.log('Testing hackathon approval email...');
    await emailService.sendHackathonApprovalEmail(testHackathon);
    console.log('✓ Hackathon approval email sent successfully');
    
    console.log('Testing judge invitation email...');
    await emailService.sendJudgeInvitationEmail(testJudge, testHackathon);
    console.log('✓ Judge invitation email sent successfully');
    
    console.log('Testing bulk judge invitations...');
    const result = await emailService.sendBulkJudgeInvitations([testJudge], testHackathon);
    console.log('✓ Bulk invitations sent:', result);
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
  } finally {
    await sql.end();
  }
}

testEmailFunctionality();