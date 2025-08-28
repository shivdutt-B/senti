import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  activityType: number;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'gif' | 'emoji' | 'movie_clip' | 'music_clip';
  correctSentiment: "joy" | "angry" | "sad" | "fear" | "surprise" | "disgust" | "neutral";
  metadata?: Record<string, any>;
}

const QuestionSchema: Schema = new Schema({
  activityType: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  mediaType: {
    type: String,
    enum: ['image', 'gif', 'emoji', 'movie_clip'],
    required: function(this: IQuestion) {
      return this.activityType === 2;
    }
  },
  content: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: false,
  },
  correctSentiment: {
    type: String,
    enum: ["joy", "angry", "sad", "fear", "surprise", "disgust", "neutral"],
    required: true,
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
    required: false,
  },
});

export default mongoose.model<IQuestion>("Question", QuestionSchema);
