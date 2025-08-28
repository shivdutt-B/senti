interface SentimentPrompts {
  [key: string]: {
    sentence: string;
    tweet: string;
  };
}

export const sentimentPrompts: SentimentPrompts = {
  joy: {
    sentence: "Create a joyful and happy sentence about a positive experience or achievement that children can relate to.",
    tweet: "Create a joyful, happy, and uplifting tweet about everyday life, achievements, or positive experiences. Make it enthusiastic and cheerful."
  },
  angry: {
    sentence: "Create an angry or frustrated sentence about a situation that children might find annoying, like losing a game or having to clean their room.",
    tweet: "Create an angry, frustrated, or indignant tweet about social issues, inconveniences, or annoying situations. Make it express clear frustration."
  },
  sad: {
    sentence: "Create a sad sentence about a relatable situation for children, like losing a toy or missing a friend.",
    tweet: "Create a sad, melancholic, or disappointing tweet about loss, failure, or unfortunate events. Make it express genuine sadness."
  },
  fear: {
    sentence: "Create a fearful sentence about common childhood concerns, like darkness or thunderstorms.",
    tweet: "Create a fearful, anxious, or worried tweet about concerns, uncertainties, or scary situations. Make it express genuine worry or fear."
  },
  surprise: {
    sentence: "Create a sentence expressing genuine surprise about an unexpected but child-friendly discovery or event.",
    tweet: "Create a surprised, amazed, or shocked tweet about unexpected events, discoveries, or revelations. Make it express genuine surprise."
  },
  disgust: {
    sentence: "Create a sentence expressing disgust about something children typically find yucky, like certain foods or messy situations.",
    tweet: "Create a disgusted, revolted, or appalled tweet about unpleasant situations, behaviors, or experiences. Make it express clear disgust."
  },
  neutral: {
    sentence: "Create a neutral, factual sentence about everyday activities or observations that children can understand.",
    tweet: "Create a neutral, factual, or matter-of-fact tweet about everyday observations, information, or routine activities. Keep it balanced and objective."
  }
};

export const BASE_SENTENCE_PROMPT = `Create a single, simple sentence that a child can easily understand expressing {sentiment}. The sentence should:
  - Be 5-15 words long
  - Use simple, age-appropriate language
  - Be relatable to children
  - Clearly express {sentiment} emotion
  - Be in present or past tense
  - Not use complex vocabulary
  - Don't include any intro or outro phrases, example "Here is a sentence" or similar
  
  Make it about: {prompt}`;

export const BASE_TWEET_PROMPT = `Return only a tweet without any prefixes, explanations, or quotation marks. The tweet should express {sentiment} emotion and be:
  - Between 50-200 characters
  - Natural and realistic
  - Clear {sentiment} sentiment
  - No hashtags or emojis
  - No quotes or prefixes like "here's a tweet" or similar
  
  Tweet directly expressing {prompt}`;

export const SENTIMENT_ANALYSIS_PROMPT = `Analyze the sentiment of the given text and respond with ONLY one of these exact words: "joy", "angry", "sad", "fear", "surprise", "disgust", or "neutral". Do not provide any explanation or additional text.

Text: {text}`;
