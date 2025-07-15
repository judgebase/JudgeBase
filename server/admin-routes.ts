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

      // Create unique slug from name
      const baseSlug = application.fullName.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
      
      // Check if slug exists and make it unique
      let slug = baseSlug;
      let counter = 1;
      while (await storage.getJudgeBySlug(slug)) {
        slug = `${baseSlug}${counter}`;
        counter++;
      }

      // Get featured and badges from request body
      const { featured = false, badges = [] } = req.body;

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

  // Edit judge application
  router.get('/api/admin/judge-applications/:id', async (req, res) => {
    try {
      const application = await storage.getJudgeApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: 'Judge application not found' });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch judge application' });
    }
  });

  // Update judge application (for editing)
  router.put('/api/admin/judge-applications/:id', async (req, res) => {
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

  // Get all approved judges
  router.get('/api/admin/judges', async (req, res) => {
    try {
      const judges = await storage.getAllJudges();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch judges' });
    }
  });

  // Update judge (featured status, badges, etc.)
  router.patch('/api/admin/judges/:id', async (req, res) => {
    try {
      const judge = await storage.updateJudge(req.params.id, req.body);
      res.json(judge);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: 'Judge not found' });
      } else {
        res.status(500).json({ error: 'Failed to update judge' });
      }
    }
  });

  // Delete judge
  router.delete('/api/admin/judges/:id', async (req, res) => {
    try {
      await storage.deleteJudge(req.params.id);
      res.json({ message: 'Judge deleted successfully' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: 'Judge not found' });
      } else {
        res.status(500).json({ error: 'Failed to delete judge' });
      }
    }
  });

  return router;
}