import express from 'express';
import { db } from './db';
import { judgeHackathons, judges, judgeApplications, hackathons } from '@shared/schema';

export function createCleanupRoute() {
  const router = express.Router();

  router.post('/cleanup-database', async (req, res) => {
    try {
      console.log('🧹 Starting database cleanup...');
      
      // Delete all records in proper order (respecting foreign key constraints)
      console.log('Deleting judge-hackathon relationships...');
      await db.delete(judgeHackathons);
      
      console.log('Deleting all judges...');
      await db.delete(judges);
      
      console.log('Deleting all judge applications...');
      await db.delete(judgeApplications);
      
      console.log('Deleting all hackathons...');
      await db.delete(hackathons);
      
      console.log('✅ Database cleaned successfully!');
      
      // Verify cleanup
      const remainingJudges = await db.select().from(judges);
      const remainingApplications = await db.select().from(judgeApplications);
      const remainingHackathons = await db.select().from(hackathons);
      const remainingRelations = await db.select().from(judgeHackathons);
      
      const counts = {
        judges: remainingJudges.length,
        applications: remainingApplications.length,
        hackathons: remainingHackathons.length,
        relations: remainingRelations.length
      };
      
      console.log(`📊 Final counts:`, counts);
      
      res.json({ 
        success: true, 
        message: 'Database cleaned successfully',
        counts 
      });
      
    } catch (error) {
      console.error('❌ Database cleanup failed:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Database cleanup failed', 
        error: error.message 
      });
    }
  });

  router.post('/restore-sample-data', async (req, res) => {
    try {
      console.log('🔄 Restoring sample judge data...');
      
      // Create a sample judge application first
      const [application] = await db.insert(judgeApplications).values({
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@techstartup.com',
        currentRole: 'Senior Software Engineer @ TechCorp',
        linkedin: 'https://linkedin.com/in/sarah-johnson-dev',
        twitterOrWebsite: 'https://sarah-codes.dev',
        avatar: null,
        hasJudgedBefore: true,
        previousExperience: 'Judged 5+ hackathons including TechCrunch Disrupt, AngelHack, and local university events',
        expertise: ['Full Stack Development', 'React/Node.js', 'AI/ML', 'Product Strategy'],
        otherExpertise: 'Cloud architecture and DevOps',
        shortBio: 'Experienced full-stack developer with 8 years in tech, specializing in React, Node.js, and AI integration. Passionate about mentoring emerging developers and evaluating innovative solutions.',
        judgingPhilosophy: 'I evaluate projects based on technical execution, innovation, and practical impact. I look for clean code, creative problem-solving, and solutions that address real user needs.',
        openToMentoring: 'Yes',
        preferredFormat: ['Virtual', 'In-Person'],
        whyJoinJudgeBase: 'I want to help emerging developers showcase their talents and provide constructive feedback to help them grow.',
        anythingElse: 'Available for follow-up mentoring with promising teams.',
        consentAgreed: true,
        status: 'approved'
      }).returning();

      // Create the corresponding judge profile
      const [judge] = await db.insert(judges).values({
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techstartup.com',
        title: 'Senior Software Engineer',
        company: 'TechCorp',
        location: 'San Francisco, CA',
        bio: 'Experienced full-stack developer with 8 years in tech, specializing in React, Node.js, and AI integration. Passionate about mentoring emerging developers and evaluating innovative solutions. Has judged 5+ major hackathons including TechCrunch Disrupt.',
        judgingPhilosophy: 'I evaluate projects based on technical execution, innovation, and practical impact. I look for clean code, creative problem-solving, and solutions that address real user needs.',
        linkedin: 'https://linkedin.com/in/sarah-johnson-dev',
        twitter: 'https://twitter.com/sarahcodes',
        website: 'https://sarah-codes.dev',
        avatar: null,
        expertise: ['Full Stack Development', 'React/Node.js', 'AI/ML', 'Product Strategy'],
        experience: 'Judged 5+ hackathons including TechCrunch Disrupt, AngelHack, and local university events',
        slug: 'sarah-johnson',
        status: 'approved',
        featured: true,
        badges: ['Top Judge', 'AI Expert']
      }).returning();

      console.log('✅ Sample data restored successfully!');
      console.log(`   Created application: ${application.id}`);
      console.log(`   Created judge: ${judge.id}`);
      
      res.json({
        success: true,
        message: 'Sample data restored successfully',
        data: {
          application: application.id,
          judge: judge.id
        }
      });
      
    } catch (error) {
      console.error('❌ Failed to restore sample data:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to restore sample data', 
        error: error.message 
      });
    }
  });

  return router;
}