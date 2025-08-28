import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import type { Question, Sentiment } from '../../types';

const SENTIMENTS: Sentiment[] = ['joy', 'angry', 'sad', 'fear', 'surprise', 'disgust', 'neutral'];
const SENTIMENT_EMOJIS: Record<Sentiment, string> = {
  joy: '😊',
  angry: '😠',
  sad: '😢',
  fear: '😨',
  surprise: '😮',
  disgust: '🤢',
  neutral: '😐'
};

export function SentenceActivity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedSentiment, setSelectedSentiment] = useState<Sentiment | null>(null);
  const [showResult, setShowResult] = useState(false);

  const fetchNewQuestion = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity1/question`);
      setCurrentQuestion(response.data);
      setSelectedSentiment(null);
      setShowResult(false);
    } catch (err) {
      setError('Failed to fetch question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSentimentSelect = async (sentiment: Sentiment) => {
    if (showResult || !currentQuestion) return;
    
    setSelectedSentiment(sentiment);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    fetchNewQuestion();
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 font-semibold text-gray-700 font-comic hover:scale-105"
          >
            <FaArrowLeft className="animate-bounce-custom" /> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-fredoka font-bold text-gray-800">
              Sentence Feelings 🎯
            </h1>
          </div>
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        ) : loading ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 text-center">
            <div className="animate-bounce text-3xl mb-4">🤔</div>
            <p className="font-comic text-gray-600">Loading your Sentence...</p>
          </div>
        ) : currentQuestion ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-baloo font-bold text-gray-800 mb-6 text-center">
              How does this sentence make you feel?
            </h2>
            <p className="text-xl font-comic text-gray-700 mb-8 text-center p-4 bg-gray-50 rounded-lg border-2 border-gray-100">
              "{currentQuestion.content}"
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {SENTIMENTS.map((sentiment) => (
                <button
                  key={sentiment}
                  onClick={() => handleSentimentSelect(sentiment)}
                  disabled={showResult}
                  className={`p-4 rounded-xl font-comic font-bold transition-all duration-300 transform hover:scale-105 ${
                    showResult
                      ? sentiment === currentQuestion.rightSentiment
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : selectedSentiment === sentiment
                        ? 'bg-red-100 text-red-700 border-2 border-red-300'
                        : 'bg-gray-50 text-gray-700'
                      : selectedSentiment === sentiment
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-2xl mb-1 block">{SENTIMENT_EMOJIS[sentiment]}</span>
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`text-center p-4 rounded-lg mb-6 ${
                selectedSentiment === currentQuestion.rightSentiment
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {selectedSentiment === currentQuestion.rightSentiment ? (
                  <p className="font-comic font-bold">
                    🎉 Correct! Great job identifying the sentiment!
                  </p>
                ) : (
                  <p className="font-comic font-bold">
                    The correct sentiment was {currentQuestion.rightSentiment}. Keep trying! 💪
                  </p>
                )}
              </div>
            )}

            {showResult && (
              <div className="text-center">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-comic font-bold hover:bg-blue-700 transition-colors duration-300 hover:scale-105 transform"
                >
                  Next Question <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
