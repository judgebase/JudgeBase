import { Router } from 'express';
import type { IStorage } from './storage';
import { z } from 'zod';
import { emailService } from './email';
import { createJudgeAuthUser, generatePassword } from './supabase-admin';
import { createHackathonAuthUser, generateHackathonPassword } from './hackathon-auth';

export function createAdminRoutes(storage: IStorage) {
  const router = Router();

  // Get all judge applications
  router.get('/api/admin/judge-applications', async (req, res) => {
    try {
      const applications = await storage.getAllJudgeApplications();
      res.json(applications);
    } catch (error) {
      console.error('Error fetching judge applications:', error);
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

      // Generate password for the judge
      const generatedPassword = generatePassword();
      
      // Create Supabase Auth user
      const authResult = await createJudgeAuthUser(application.email, generatedPassword);
      
      if (!authResult.success) {
        console.error('Failed to create auth user:', authResult.error);
        // Continue with judge creation even if auth fails
      }

      // Create judge profile from application
      const judgeData = {
        name: application.fullName,
        email: application.email,
        title: application.currentRole,
        company: application.currentRole.split(' @ ')[1] || 'Independent',
        location: application.location || 'Not specified',
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
        authPassword: generatedPassword, // Store the generated password
      };

      const judge = await storage.createJudge(judgeData);
      
      // Update application status to approved
      await storage.updateJudgeApplication(req.params.id, { status: 'approved' });

      res.json({ 
        judge, 
        password: generatedPassword, 
        message: 'Judge approved and profile created with login credentials',
        authUser: authResult.success ? authResult.user : null
      });
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
      console.error('Error fetching judges:', error);
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

  // Get all hackathons
  router.get('/api/admin/hackathons', async (req, res) => {
    try {
      const hackathons = await storage.getAllHackathons();
      res.json(hackathons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch hackathons' });
    }
  });

  // Update hackathon status with email notification
  router.patch('/api/admin/hackathons/:id', async (req, res) => {
    try {
      const hackathon = await storage.updateHackathon(req.params.id, req.body);
      
      // Send email notification if hackathon is approved
      if (req.body.status === 'approved') {
        try {
          await emailService.sendHackathonApprovalEmail(hackathon);
        } catch (emailError) {
          console.error('Failed to send approval email:', emailError);
          // Continue with success response even if email fails
        }
      }
      
      res.json(hackathon);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({ error: 'Hackathon not found' });
      } else {
        res.status(500).json({ error: 'Failed to update hackathon' });
      }
    }
  });

  // Approve hackathon and generate credentials
  router.post('/api/admin/hackathons/:id/approve', async (req, res) => {
    try {
      const hackathon = await storage.getHackathon(req.params.id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      // Generate password for hackathon organizer
      const generatedPassword = generateHackathonPassword();
      
      // Create auth user (optional, for future use)
      const authResult = await createHackathonAuthUser(hackathon.organizerEmail, generatedPassword);
      
      // Update hackathon with approval and credentials
      const updatedHackathon = await storage.updateHackathon(req.params.id, {
        status: 'approved',
        authPassword: generatedPassword
      });

      // Send approval email
      try {
        await emailService.sendHackathonApprovalEmail(updatedHackathon);
      } catch (emailError) {
        console.error('Failed to send approval email:', emailError);
        // Continue even if email fails
      }
      
      res.json({ 
        hackathon: updatedHackathon, 
        password: generatedPassword, 
        message: 'Hackathon approved and credentials generated',
        authUser: authResult.success ? authResult.user : null
      });
    } catch (error) {
      console.error('Error approving hackathon:', error);
      res.status(500).json({ error: 'Failed to approve hackathon' });
    }
  });

  // Get approved judges for hackathon invitations
  router.get('/api/admin/hackathons/:id/available-judges', async (req, res) => {
    try {
      const judges = await storage.getAllJudges();
      const approvedJudges = judges.filter(judge => judge.status === 'approved');
      res.json(approvedJudges);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch available judges' });
    }
  });

  // Send invitations to selected judges
  router.post('/api/admin/hackathons/:id/invite-judges', async (req, res) => {
    try {
      const { judgeIds } = req.body;
      
      if (!judgeIds || !Array.isArray(judgeIds) || judgeIds.length === 0) {
        return res.status(400).json({ error: 'Please select at least one judge' });
      }

      const hackathon = await storage.getHackathon(req.params.id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      if (hackathon.status !== 'approved') {
        return res.status(400).json({ error: 'Hackathon must be approved before inviting judges' });
      }

      // Get selected judges
      const selectedJudges = [];
      for (const judgeId of judgeIds) {
        const judge = await storage.getJudge(judgeId);
        if (judge && judge.status === 'approved') {
          selectedJudges.push(judge);
        }
      }

      if (selectedJudges.length === 0) {
        return res.status(400).json({ error: 'No valid judges found' });
      }

      // Send bulk invitations
      const result = await emailService.sendBulkJudgeInvitations(selectedJudges, hackathon);

      // Create invitation records in database
      for (const judge of selectedJudges) {
        try {
          await storage.createJudgeHackathonInvitation({
            judgeId: judge.id,
            hackathonId: hackathon.id,
            status: 'pending'
          });
        } catch (error) {
          console.error('Failed to create invitation record:', error);
        }
      }

      res.json({
        message: `Invitations sent to ${result.success} judges`,
        success: result.success,
        failed: result.failed,
        totalSelected: selectedJudges.length
      });
    } catch (error) {
      console.error('Failed to send invitations:', error);
      res.status(500).json({ error: 'Failed to send invitations' });
    }
  });

  // Get hackathon invitations
  router.get('/api/admin/hackathons/:id/invitations', async (req, res) => {
    try {
      const invitations = await storage.getHackathonInvitations(req.params.id);
      res.json(invitations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch invitations' });
    }
  });

  return router;
}