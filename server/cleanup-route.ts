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

  return router;
}