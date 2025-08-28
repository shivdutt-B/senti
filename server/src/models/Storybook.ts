import mongoose, { Schema, Document } from 'mongoose';

// Interface for a single page in the storybook
interface IStorybookPage {
  pageNo: number;
  content: string;
  mediaUrl: string;
  sentiment: string;
  coverPage: string;
}

// Interface for the entire storybook document
export interface IStorybook extends Document {
  title: string;
  pages: IStorybookPage[];
}

// Schema for a single page
const StorybookPageSchema = new Schema({
  pageNo: {
    type: Number,
    required: true,
    min: 1
  },
  content: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    required: true
  },
  coverPage: {
    type: String,
    required: true
  }
});

// Main storybook schema
const StorybookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  coverPage: {
    type: String,
    required: true
  },
  pages: {
    type: [StorybookPageSchema],
    required: true,
    validate: [
      {
        validator: function(pages: IStorybookPage[]) {
          // Ensure pages array is not empty
          return pages.length > 0;
        },
        message: 'Storybook must have at least one page'
      },
      {
        validator: function(pages: IStorybookPage[]) {
          // Verify page numbers are sequential starting from 1
          const pageNos = pages.map(page => page.pageNo).sort((a, b) => a - b);
          return pageNos.every((num, index) => num === index + 1);
        },
        message: 'Page numbers must be sequential starting from 1'
      }
    ]
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for efficient querying
StorybookSchema.index({ title: 1 });

export default mongoose.model<IStorybook>('Storybook', StorybookSchema);
