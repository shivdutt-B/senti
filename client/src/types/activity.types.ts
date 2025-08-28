interface Question {
  id: string;
  content: string;
  rightSentiment: Sentiment;
}

type Sentiment = 'joy' | 'angry' | 'sad' | 'fear' | 'surprise' | 'disgust' | 'neutral';

interface QuestionResult {
  question: Question;
  selectedSentiment: Sentiment;
  isCorrect: boolean;
}

export type { Question, Sentiment, QuestionResult };
