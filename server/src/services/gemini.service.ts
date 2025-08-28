import { sentimentPrompts, BASE_SENTENCE_PROMPT, BASE_TWEET_PROMPT, SENTIMENT_ANALYSIS_PROMPT } from '../prompts/sentiment.prompts';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function generateGeminiContent(prompt: string): Promise<string> {
  try {
    const response = await fetch(GEMINI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY || ''
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export class GeminiService {
  private static readonly SENTIMENTS = ['joy', 'angry', 'sad', 'fear', 'surprise', 'disgust', 'neutral'];

  static async generateSentimentBasedSentence(): Promise<{ sentence: string; sentiment: string }> {
    try {
      // Randomly select a sentiment
      const targetSentiment = this.SENTIMENTS[Math.floor(Math.random() * this.SENTIMENTS.length)];
      
      // Generate sentence based on the selected sentiment
      const sentence = await this.generateSentenceWithSentiment(targetSentiment);
      
      return {
        sentence,
        sentiment: targetSentiment
      };
    } catch (error) {
      console.error('Error generating sentiment-based sentence:', error);
      throw error;
    }
  }

  private static async generateSentenceWithSentiment(sentiment: string): Promise<string> {
    try {
      const prompt = BASE_SENTENCE_PROMPT
        .replace(/{sentiment}/g, sentiment)
        .replace(/{prompt}/g, sentimentPrompts[sentiment]?.sentence || '');

      let sentence = await generateGeminiContent(prompt);
      
      // Clean up any potential prefixes or quotation marks
      sentence = sentence
        .replace(/^(sentence:?\s*|here'?s?\s+(a|the)\s+sentence:?\s*)/i, '')
        .replace(/^['""]|['""]$/g, '')
        .trim();
      
      if (!sentence) {
        throw new Error('No sentence generated');
      }

      return sentence;
      
    } catch (error) {
      console.error(`Error generating ${sentiment} sentence:`, error);
      throw error;
    }
  }

  static async generateSentimentBasedTweet(): Promise<{ tweet: string; sentiment: string }> {
    try {
      // Randomly select a sentiment
      const targetSentiment = this.SENTIMENTS[Math.floor(Math.random() * this.SENTIMENTS.length)];
      
      // Generate tweet based on the selected sentiment
      const tweet = await this.generateTweetWithSentiment(targetSentiment);
      
      return {
        tweet,
        sentiment: targetSentiment
      };
    } catch (error) {
      console.error('Error generating sentiment-based tweet:', error);
      throw error;
    }
  }

  private static async generateTweetWithSentiment(sentiment: string): Promise<string> {
    try {
      const prompt = BASE_TWEET_PROMPT
        .replace(/{sentiment}/g, sentiment)
        .replace(/{prompt}/g, sentimentPrompts[sentiment]?.tweet || '');

      let tweet = await generateGeminiContent(prompt);
      
      // Clean up any potential prefixes or explanations
      tweet = tweet
        .replace(/^(here'?s?\s+(a|the)\s+tweet:?\s*|tweet:?\s*)/i, '')
        .replace(/^['""]|['""]$/g, '')
        .trim();
      
      if (!tweet) {
        throw new Error('No tweet generated');
      }

      // Remove quotes if the AI wrapped the tweet in quotes
      return tweet.replace(/^["']|["']$/g, '');
      
    } catch (error) {
      console.error(`Error generating ${sentiment} tweet:`, error);
      throw error;
    }
  }

  // Alternative method to verify sentiment if needed
  static async analyzeSentiment(text: string): Promise<string> {
    try {
      const prompt = SENTIMENT_ANALYSIS_PROMPT.replace(/{text}/g, text);

      const sentiment = await generateGeminiContent(prompt);
      
      // Validate the response is one of our expected sentiments
      if (sentiment && this.SENTIMENTS.includes(sentiment.toLowerCase())) {
        return sentiment.toLowerCase();
      } else {
        console.warn(`Invalid sentiment response: ${sentiment}, defaulting to neutral`);
        return "neutral";
      }
    } catch (error) {
      console.error('Error analyzing sentiment with Gemini:', error);
      return "neutral";
    }
  }
}
