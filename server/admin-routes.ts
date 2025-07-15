import { Router } from 'express';
import type { IStorage } from './storage';
import { z } from 'zod';

export function createAdminRoutes(storage: IStorage) {
  const router = Router();

  // Get all judge applications
  router.get('/api/admin/judge-applications', async (req, res) => {
    try {
      const applications = await storage.getAllJudgeApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch judge applications' });
    }
  });

  // Update judge application status
  router.patch('/api/admin/judge-applications/:id', async (req, res) => {
    try {
      const application = await storage.updateJudgeApplication(req.params.id, req.body);
      res.json(application);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: 'Judge application not found' });
      } else {
        res.status(500).json({ error: 'Failed to update judge application' });
      }
    }
  });

  // Approve judge application and create judge profile
  router.post('/api/admin/judge-applications/:id/approve', async (req, res) => {
    try {
      const application = await storage.getJudgeApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: 'Judge application not found' });
      }

      // Create slug from name
      const slug = application.fullName.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);

      // Create judge profile from application
      const judgeData = {
        name: application.fullName,
        title: application.currentRole,
        company: application.currentRole.split(' @ ')[1] || 'Independent',
        location: 'India', // Default location
        bio: application.shortBio,
        judgingPhilosophy: application.judgingPhilosophy,
        linkedin: application.linkedin,
        twitter: application.twitterOrWebsite || '',
        website: application.twitterOrWebsite || '',
        avatar: application.avatar,
        expertise: application.expertise,
        experience: application.previousExperience || 'New to judging hackathons',
        slug: slug,
        status: 'approved' as const,
        featured: req.body.featured || false,
        badges: req.body.badges || [],
      };

      const judge = await storage.createJudge(judgeData);
      
      // Update application status to approved
      await storage.updateJudgeApplication(req.params.id, { status: 'approved' });

      res.json({ judge, message: 'Judge approved and profile created' });
    } catch (error) {
      console.error('Error approving judge:', error);
      res.status(500).json({ error: 'Failed to approve judge application' });
    }
  });

  return router;
}