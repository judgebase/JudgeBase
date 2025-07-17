import { Router } from 'express';
import type { IStorage } from './storage';
import { z } from 'zod';
import { createHackathonAuthUser, generateHackathonPassword } from './hackathon-auth';
import { fromZodError } from 'zod-validation-error';

export function createHackathonRoutes(storage: IStorage) {
  const router = Router();

  // Get hackathon by email (for authentication)
  router.post('/api/hackathons/auth', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const hackathons = await storage.getAllHackathons();
      const hackathon = hackathons.find(h => 
        h.organizerEmail === email && 
        h.authPassword === password &&
        h.status === 'approved'
      );

      if (!hackathon) {
        return res.status(401).json({ error: 'Invalid credentials or hackathon not approved' });
      }

      res.json({ success: true, hackathon });
    } catch (error) {
      console.error('Error authenticating hackathon:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  });

  // Get judges who expressed interest in a hackathon
  router.get('/api/hackathons/:id/interested-judges', async (req, res) => {
    try {
      const { id } = req.params;
      const interests = await storage.getJudgingInterestsByHackathon(id);
      
      // Get detailed judge information for each interest
      const judgesWithInterest = await Promise.all(
        interests.map(async (interest) => {
          const judge = await storage.getJudgeById(interest.judgeId);
          return {
            ...interest,
            judge
          };
        })
      );

      res.json({ success: true, data: judgesWithInterest });
    } catch (error) {
      console.error('Error fetching interested judges:', error);
      res.status(500).json({ error: 'Failed to fetch interested judges' });
    }
  });

  // Update judge interest status (accept/reject)
  router.patch('/api/hackathons/:hackathonId/judges/:judgeId/interest', async (req, res) => {
    try {
      const { hackathonId, judgeId } = req.params;
      const { status } = req.body;

      if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Status must be accepted or rejected' });
      }

      const updatedInterest = await storage.updateJudgingInterestStatus(judgeId, hackathonId, status);
      res.json({ success: true, data: updatedInterest });
    } catch (error) {
      console.error('Error updating judge interest:', error);
      res.status(500).json({ error: 'Failed to update judge interest' });
    }
  });

  // Get hackathon dashboard data
  router.get('/api/hackathons/:id/dashboard', async (req, res) => {
    try {
      const { id } = req.params;
      const hackathon = await storage.getHackathonById(id);
      
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      const interests = await storage.getJudgingInterestsByHackathon(id);
      const stats = {
        totalInterested: interests.length,
        accepted: interests.filter(i => i.status === 'accepted').length,
        pending: interests.filter(i => i.status === 'pending').length,
        rejected: interests.filter(i => i.status === 'rejected').length
      };

      res.json({ 
        success: true, 
        data: {
          hackathon,
          stats,
          interests: interests.length
        }
      });
    } catch (error) {
      console.error('Error fetching hackathon dashboard:', error);
      res.status(500).json({ error: 'Failed to fetch hackathon dashboard' });
    }
  });

  return router;
}