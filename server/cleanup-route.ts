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

  router.post('/add-rishul-data', async (req, res) => {
    try {
      console.log('🔄 Adding Rishul Chanana to database...');
      
      // Create Rishul's judge application
      const [application] = await db.insert(judgeApplications).values({
        fullName: 'Rishul Chanana',
        email: 'rishulchanana@maximally.in',
        currentRole: 'Founder @ Maximally',
        linkedin: 'https://www.linkedin.com/in/rishul-chanana/',
        twitterOrWebsite: 'https://www.rishulchanana.com',
        avatar: null,
        hasJudgedBefore: true,
        previousExperience: 'Founded Maximally - a team that designs live hackathon competitions where builders meet, collaborate, and create under pressure',
        expertise: ['Hackathon Organization', 'Startup Founding', 'Product Strategy', 'Community Building'],
        otherExpertise: 'Live competition design and execution',
        shortBio: "I'm the founder of maximally — a team that lives and breathes hackathons. We design live competitions where builders meet, collaborate, and create under pressure. Code meets creativity. People meet ideas. And everything moves fast.",
        judgingPhilosophy: 'My judging philosophy is simple: execution > ideas. I care more about what someone built in the given time than how fancy their pitch sounds. A half-working prototype that solves a real problem beats a perfect slide deck with no code behind it.',
        openToMentoring: 'Yes',
        preferredFormat: ['Virtual', 'In-Person'],
        whyJoinJudgeBase: 'To help builders create impactful prototypes and focus on execution over presentation.',
        anythingElse: 'Passionate about connecting builders and fostering innovation through hackathons.',
        consentAgreed: true,
        status: 'approved'
      }).returning();

      // Create Rishul's judge profile
      const [judge] = await db.insert(judges).values({
        name: 'Rishul Chanana',
        email: 'rishulchanana@maximally.in',
        title: 'Founder',
        company: 'Maximally',
        location: 'India',
        bio: "I'm the founder of maximally — a team that lives and breathes hackathons. We design live competitions where builders meet, collaborate, and create under pressure. Code meets creativity. People meet ideas. And everything moves fast.",
        judgingPhilosophy: 'My judging philosophy is simple: execution > ideas. I care more about what someone built in the given time than how fancy their pitch sounds. A half-working prototype that solves a real problem beats a perfect slide deck with no code behind it.',
        linkedin: 'https://www.linkedin.com/in/rishul-chanana/',
        twitter: '',
        website: 'https://www.rishulchanana.com',
        avatar: null,
        expertise: ['Hackathon Organization', 'Startup Founding', 'Product Strategy', 'Community Building'],
        experience: 'Founded Maximally - a team that designs live hackathon competitions where builders meet, collaborate, and create under pressure',
        slug: 'rishul-chanana',
        status: 'approved',
        featured: true,
        badges: ['Founder', 'Hackathon Expert']
      }).returning();

      // Create a sample hackathon
      const [hackathon] = await db.insert(hackathons).values({
        organizerName: 'Alex Rodriguez',
        organizerEmail: 'alex@techuniversity.edu',
        organizationName: 'Tech University',
        organizerRole: 'Director of Innovation',
        organizerWebsite: 'https://techuniversity.edu',
        hackathonName: 'TechU Innovation Challenge 2025',
        hackathonWebsite: 'https://techu-hack.com',
        platform: 'Devpost',
        hackathonDates: 'March 15-17, 2025',
        judgeDeadline: 'March 20, 2025',
        eventFormat: ['Virtual'],
        participantCount: '150-300',
        isFirstTime: 'No',
        theme: 'AI for Social Good',
        domains: ['Artificial Intelligence', 'Social Impact', 'Machine Learning'],
        eventSummary: 'A 48-hour hackathon focused on building AI solutions that address social challenges and improve communities.',
        needMentors: 'Yes',
        hasExistingJudges: 'No',
        deliverables: ['Working prototype', 'Pitch presentation', 'Source code repository'],
        judgeCount: '8-12',
        timeCommitment: '4-6 hours total over judging period',
        whyJudgeBase: 'Looking for experienced judges who understand both technical excellence and social impact potential',
        additionalNotes: 'First time using JudgeBase - excited to work with expert judges',
        status: 'pending'
      }).returning();

      console.log('✅ Rishul data and sample hackathon added successfully!');
      console.log(`   Created application: ${application.id}`);
      console.log(`   Created judge: ${judge.id}`);
      console.log(`   Created hackathon: ${hackathon.id}`);
      
      res.json({
        success: true,
        message: 'Rishul data and sample hackathon added successfully',
        data: {
          application: application.id,
          judge: judge.id,
          hackathon: hackathon.id
        }
      });
      
    } catch (error) {
      console.error('❌ Failed to add Rishul data:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to add Rishul data', 
        error: error.message 
      });
    }
  });

  return router;
}