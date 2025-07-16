import { Router } from 'express';
import type { IStorage } from './storage';
import { insertJudgingInterestSchema } from '@shared/schema';
import { fromZodError } from 'zod-validation-error';

export function createJudgingRoutes(storage: IStorage) {
  const router = Router();

  // Get all judging interests for a judge
  router.get('/judging-interests/:judgeId', async (req, res) => {
    try {
      const { judgeId } = req.params;
      const interests = await storage.getJudgingInterestsByJudge(judgeId);
      res.json({ success: true, data: interests });
    } catch (error) {
      console.error('Error fetching judging interests:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch judging interests' });
    }
  });

  // Express interest in a hackathon
  router.post('/judging-interests', async (req, res) => {
    try {
      const validatedData = insertJudgingInterestSchema.parse(req.body);
      
      // Check if interest already exists
      const hasInterest = await storage.hasJudgeExpressedInterest(validatedData.judgeId, validatedData.hackathonId);
      if (hasInterest) {
        return res.status(409).json({ success: false, error: 'Interest already expressed' });
      }

      const interest = await storage.createJudgingInterest(validatedData);
      res.json({ success: true, data: interest });
    } catch (error) {
      console.error('Error creating judging interest:', error);
      
      if (error instanceof Error && error.name === 'ZodError') {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, error: validationError.message });
      }
      
      res.status(500).json({ success: false, error: 'Failed to create judging interest' });
    }
  });

  return router;
}