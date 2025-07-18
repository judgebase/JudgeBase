import { Router } from 'express';
import { IStorage } from './storage';
import { insertJudgeSchema, insertHackathonSchema, insertJudgeApplicationSchema } from '@shared/schema';
import { z } from 'zod';
import multer from 'multer';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

export function createRoutes(storage: IStorage) {
  const router = Router();

  // Get featured judges for homepage
  router.get('/api/judges/featured', async (req, res) => {
    try {
      const judges = await storage.getFeaturedJudges();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch featured judges' });
    }
  });

  // Get all judges (public API for judging page)
  router.get('/api/judges', async (req, res) => {
    try {
      const judges = await storage.getAllJudges();
      res.json({ success: true, data: judges });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch judges' });
    }
  });

  // Get all judges (admin only)
  router.get('/api/admin/judges', async (req, res) => {
    try {
      const judges = await storage.getAllJudges();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch judges' });
    }
  });

  // Get judge by slug
  router.get('/api/judges/:slug', async (req, res) => {
    try {
      const judge = await storage.getJudgeBySlug(req.params.slug);
      if (!judge) {
        return res.status(404).json({ error: 'Judge not found' });
      }
      res.json(judge);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch judge' });
    }
  });

  // Submit judge application
  router.post('/api/judges/apply', upload.single('avatar'), async (req, res) => {
    try {
      const applicationData = {
        ...req.body,
        expertise: req.body.expertise ? req.body.expertise.split(',').map((e: string) => e.trim()) : [],
        preferredFormat: req.body.preferredFormat ? req.body.preferredFormat.split(',').map((f: string) => f.trim()) : [],
        avatar: req.file ? req.file.path : null,
        hasJudgedBefore: req.body.hasJudgedBefore === 'true',
        consentAgreed: req.body.consentAgreed === 'true',
      };

      const validatedData = insertJudgeApplicationSchema.parse(applicationData);
      const application = await storage.createJudgeApplication(validatedData);
      
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create judge application' });
      }
    }
  });

  // Submit hackathon application
  router.post('/api/hackathons/apply', async (req, res) => {
    try {
      const validatedData = insertHackathonSchema.parse(req.body);
      const hackathon = await storage.createHackathon(validatedData);
      
      res.status(201).json(hackathon);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create hackathon application' });
      }
    }
  });

  // Get all judge applications (admin only)
  router.get('/api/admin/judge-applications', async (req, res) => {
    try {
      const applications = await storage.getAllJudgeApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch judge applications' });
    }
  });

  // Update judge application (admin only)
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

  // Update judge (admin only)
  router.patch('/api/admin/judges/:id', async (req, res) => {
    try {
      const judge = await storage.updateJudge(req.params.id, req.body);
      res.json(judge);
    } catch (error) {
      if (error instanceof Error && error.message === 'Judge not found') {
        res.status(404).json({ error: 'Judge not found' });
      } else {
        res.status(500).json({ error: 'Failed to update judge' });
      }
    }
  });

  // Submit hackathon request
  router.post('/api/hackathons/apply', async (req, res) => {
    try {
      const validatedData = insertHackathonSchema.parse(req.body);
      const hackathon = await storage.createHackathon(validatedData);
      
      res.status(201).json(hackathon);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create hackathon request' });
      }
    }
  });

  // Get all hackathons (public API for judging page)
  router.get('/api/hackathons', async (req, res) => {
    try {
      const hackathons = await storage.getAllHackathons();
      res.json({ success: true, data: hackathons });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch hackathons' });
    }
  });

  // Get all hackathons (admin only)
  router.get('/api/admin/hackathons', async (req, res) => {
    try {
      const hackathons = await storage.getAllHackathons();
      res.json(hackathons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hackathons' });
    }
  });

  // Update hackathon status (admin only)
  router.patch('/api/admin/hackathons/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedHackathon = await storage.updateHackathon(id, { status });
      res.json(updatedHackathon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update hackathon' });
    }
  });

  // Invite judges to hackathon (admin only)
  router.post('/api/admin/hackathons/:id/invite-judges', async (req, res) => {
    try {
      const { id } = req.params;
      const { judgeIds } = req.body;
      
      const invitations = [];
      for (const judgeId of judgeIds) {
        const invitation = await storage.createJudgeHackathonInvitation({
          judgeId,
          hackathonId: id,
          invitationStatus: 'pending'
        });
        invitations.push(invitation);
      }
      
      res.json(invitations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to invite judges' });
    }
  });

  // Get hackathon invitations (admin only)
  router.get('/api/admin/hackathons/:id/invitations', async (req, res) => {
    try {
      const { id } = req.params;
      const invitations = await storage.getHackathonInvitations(id);
      res.json(invitations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invitations' });
    }
  });

  return router;
}