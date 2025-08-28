import { Request, Response } from 'express';
import Storybook from '../models/Storybook';

// Get all storybooks with their titles and cover pages
export const getAllStorybooks = async (req: Request, res: Response) => {
  try {
    // Fetch only necessary fields for the listing
    const storybooks = await Storybook.find({}, {
      title: 1,
      coverPage: 1
    });

    res.json(storybooks.map(book => ({
      id: book._id,
      title: book.title,
      coverPage: book.coverPage
    })));
  } catch (error) {
    console.error('Error fetching storybooks:', error);
    res.status(500).json({ 
      error: 'Failed to fetch storybooks',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get a complete story by ID
export const getStoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const story = await Storybook.findById(id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({
      id: story._id,
      title: story.title,
      coverPage: story.coverPage,
      pages: story.pages.sort((a, b) => a.pageNo - b.pageNo) // Ensure pages are in order
    });
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ 
      error: 'Failed to fetch story',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};