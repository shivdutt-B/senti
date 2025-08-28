import { Router } from 'express';
import { getActivity1Question } from '../controllers/activity1.controller';
import { 
  getActivity2ImageQuestion, 
  getActivity2GifQuestion,
  getActivity2MovieClipQuestion
} from '../controllers/activity2.controller';
import { getActivity3Question } from '../controllers/activity3.controller';
import { getAllStorybooks, getStoryById } from '../controllers/activity4.controller';
import { getActivity5Question } from '../controllers/activity5.controller';

const router = Router();

/*
 * Activity 1 routes
 * Method: GET
 * Endpoint: /api/activity1/question
 * Description: Generarate question using Gemini API along with its sentiment and sent back to client.
*/
router.get('/activity1/question', getActivity1Question);

/*
 * Activity 2 routes
 * Method: GET
 * Endpoint: /api/activity2/images/question
 * Description: Fetch a new image question along with its correct sentiment.
*/
router.get('/activity2/images/question', getActivity2ImageQuestion);

/*
 * Activity 2 routes
 * Method: GET
 * Endpoint: /api/activity2/gifs/question
 * Description: Fetch a new GIF question along with its correct sentiment.
*/
router.get('/activity2/gifs/question', getActivity2GifQuestion);

/*
 * Activity 2 routes
 * Method: GET
 * Endpoint: /api/activity2/movie-clips/question
 * Description: Fetch a new movie clip question along with its correct sentiment.
*/
router.get('/activity2/movie-clips/question', getActivity2MovieClipQuestion);

/*
 * Activity 3 routes
 * Method: GET
 * Endpoint: /api/activity3/question
 * Description: Generarate tweets using Gemini API along with its sentiment and sent back to client.
*/
router.get('/activity3/question', getActivity3Question);

/*
 * Activity 4 routes
 * Method: GET
 * Endpoint: /api/activity4/storybooks
 * Description: Fetch all storybooks with their titles and cover pages.
 *
 * Method: GET
 * Endpoint: /api/activity4/story/:id
 * Description: Fetch a specific story by its ID, including all pages.
*/
router.get('/activity4/storybooks', getAllStorybooks);
router.get('/activity4/story/:id', getStoryById);

/*
 * Activity 5 routes
 * Method: GET
 * Endpoint: /api/activity5/question
 * Description: Send music clip question along with its correct sentiment.
*/
router.get('/activity5/question', getActivity5Question);

export default router;
