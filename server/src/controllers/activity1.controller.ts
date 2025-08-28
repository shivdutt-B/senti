import { Request, Response } from 'express';
import { GeminiService } from '../services/gemini.service';

export const getActivity1Question = async (req: Request, res: Response) => {
  try {
    const { sentence, sentiment } = await GeminiService.generateSentimentBasedSentence();
    
    res.json({
      content: sentence,
      rightSentiment: sentiment
    });
  } catch (error) {
    console.error('Error in getActivity1Question:', error);
    res.status(500).json({ 
      error: 'Failed to generate sentence',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
