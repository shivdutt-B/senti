import { Request, Response } from 'express';
import Question from '../models/Question';


export const getActivity5Question = async (req: Request, res: Response) => {
  try {
    const count = await Question.countDocuments({ activityType: 5 });
    const random = Math.floor(Math.random() * count);

    const question = await Question.findOne({ activityType: 5 }).skip(random);

    if (!question) {
      return res.status(404).json({ error: 'No questions found' });
    }


    res.json({
      id: question._id,
      mediaUrl: question.mediaUrl,
      content: question.content, 
      correctSentiment: question.correctSentiment
    });
  } catch (error) {
    console.error('Error in getActivity5Question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};