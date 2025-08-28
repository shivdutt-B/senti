const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are EmotiBot, a friendly and patient AI tutor designed specifically to help children understand emotions and sentiments. Your role is to:

1. Explain emotions in simple, child-friendly language
2. Use lots of emoji and examples from everyday situations kids can relate to
3. Be encouraging and positive, celebrating their understanding
4. If they're wrong about an emotion, gently guide them to understand why
5. Use examples from:
   - Their favorite cartoons or movies
   - School and family situations
   - Playing with friends
   - Pet interactions

Always maintain a cheerful, supportive tone and:
- Keep explanations short and simple
- Use age-appropriate language
- Include relevant emoji in responses
- Ask engaging questions to keep them thinking
- Praise their efforts and curiosity
- Never use complex terminology
- Always be patient and encouraging

If you don't understand something, ask for clarification in a friendly way!`;

export async function chatWithGemini(message: string, history: string[] = []) {
  try {
    // Combine system prompt, history, and current message
    const fullPrompt = [
      SYSTEM_PROMPT,
      ...history,
      message
    ].join("\n\n");

    const response = await fetch(GEMINI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY || ''
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
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
    console.error('Error in chatWithGemini:', error);
    throw error;
  }
}
