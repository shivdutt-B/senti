import { Request, Response } from 'express';
import Question from '../models/Question';

// Helper function to get random question by media type
async function getRandomQuestionByMediaType(mediaType: string, res: Response) {
  try {
    const count = await Question.countDocuments({ 
      activityType: 2,
      mediaType: mediaType 
    });
    const random = Math.floor(Math.random() * count);

    const question = await Question.findOne({ 
      activityType: 2,
      mediaType: mediaType 
    }).skip(random);

    if (!question) {
      return res.status(404).json({ error: `No ${mediaType} questions found` });
    }

    return res.json({
      id: question._id,
      mediaUrl: question.mediaUrl,
      content: question.content,
      correctSentiment: question.correctSentiment
    });
  } catch (error) {
    console.error(`Error in get${mediaType}Question:`, error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const getActivity2ImageQuestion = async (req: Request, res: Response) => {
  return getRandomQuestionByMediaType('image', res);
};

export const getActivity2GifQuestion = async (req: Request, res: Response) => {
  return getRandomQuestionByMediaType('gif', res);
};

export const getActivity2MovieClipQuestion = async (req: Request, res: Response) => {
  return getRandomQuestionByMediaType('movie_clip', res);
};
