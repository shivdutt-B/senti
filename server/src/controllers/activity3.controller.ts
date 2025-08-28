// controllers/activity3.controller.ts
import { Request, Response } from 'express';
import { GeminiService } from '../services/gemini.service';

export const getActivity3Question = async (req: Request, res: Response) => {
  try {
    const { tweet, sentiment } = await GeminiService.generateSentimentBasedTweet();
    
    res.json({
      content: tweet,
      correctSentiment: sentiment
    });
  } catch (error) {
    console.error('Error in getActivity3Question:', error);
    res.status(500).json({ 
      error: 'Failed to generate tweet',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};