import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaArrowCircleLeft, FaArrowCircleRight, FaTwitter } from 'react-icons/fa';
import axios from 'axios';

interface Question {
  content: string;
  correctSentiment: string;
}

interface AnsweredQuestion extends Question {
  selectedSentiment: string;
  isCorrect: boolean;
}

const sentimentOptions = [
  { value: 'joy', label: 'Joy', emoji: '😊' },
  { value: 'angry', label: 'Angry', emoji: '😠' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'fear', label: 'Fear', emoji: '😨' },
  { value: 'surprise', label: 'Surprise', emoji: '😲' },
  { value: 'disgust', label: 'Disgust', emoji: '🤢' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
];

export function TweetsActivity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [history, setHistory] = useState<AnsweredQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedSentiment, setSelectedSentiment] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const fetchNewQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity3/question`);
      setCurrentQuestion(response.data);
      setSelectedSentiment('');
      setShowFeedback(false);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const handleSentimentSelect = (sentiment: string) => {
    if (showFeedback || !currentQuestion) return;

    setSelectedSentiment(sentiment);
    const isCorrect = sentiment === currentQuestion.correctSentiment;
    setIsCorrect(isCorrect);
    setShowFeedback(true);

    const answeredQuestion: AnsweredQuestion = {
      ...currentQuestion,
      selectedSentiment: sentiment,
      isCorrect,
    };

    setHistory([...history.slice(0, currentIndex + 1), answeredQuestion]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleNextQuestion = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextQuestion = history[currentIndex + 1];
      setCurrentQuestion(nextQuestion);
      setSelectedSentiment(nextQuestion.selectedSentiment);
      setShowFeedback(true);
      setIsCorrect(nextQuestion.isCorrect);
    } else {
      fetchNewQuestion();
      setCurrentIndex(history.length);
    }
  };

  const navigateHistory = (direction: 'forward' | 'backward') => {
    const newIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
    
    if (newIndex >= 0 && newIndex < history.length) {
      setCurrentIndex(newIndex);
      const historyQuestion = history[newIndex];
      setCurrentQuestion(historyQuestion);
      setSelectedSentiment(historyQuestion.selectedSentiment);
      setShowFeedback(true);
      setIsCorrect(historyQuestion.isCorrect);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
        <div className="animate-bounce text-3xl mb-4">
          <FaTwitter className="text-blue-400" />
        </div>
        <p className="font-comic text-gray-600">Loading tweets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 font-semibold text-gray-700 font-comic hover:scale-105"
          >
            <FaArrowLeft className="animate-bounce-custom" /> Back to Home
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateHistory('backward')}
              disabled={currentIndex <= 0}
              className={`text-2xl ${currentIndex <= 0 ? 'text-gray-400' : 'text-gray-700 hover:scale-110 transform transition-transform'}`}
            >
              <FaArrowCircleLeft />
            </button>
            <span className="font-comic font-bold text-gray-700">
              Tweet {currentIndex + 1} of {Math.max(history.length, currentIndex + 1)}
            </span>
            <button
              onClick={() => navigateHistory('forward')}
              disabled={currentIndex >= history.length - 1}
              className={`text-2xl ${currentIndex >= history.length - 1 ? 'text-gray-400' : 'text-gray-700 hover:scale-110 transform transition-transform'}`}
            >
              <FaArrowCircleRight />
            </button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-baloo font-bold text-gray-800 mb-6 text-center">
            What feeling does this tweet express?
          </h2>
          
          <div className="relative mb-6 rounded-xl overflow-hidden bg-white border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FaTwitter className="text-blue-400 text-xl" />
              </div>
              <div>
                <p className="font-bold text-gray-900 mb-1">Tweet Detective</p>
                <p className="text-xl font-comic text-gray-700">
                  {currentQuestion?.content}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {sentimentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSentimentSelect(option.value)}
                disabled={showFeedback}
                className={`p-4 rounded-xl font-comic font-bold transition-all duration-300 transform hover:scale-105 ${
                  showFeedback
                    ? option.value === currentQuestion?.correctSentiment
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : selectedSentiment === option.value
                      ? 'bg-red-100 text-red-700 border-2 border-red-300'
                      : 'bg-gray-50 text-gray-700'
                    : selectedSentiment === option.value
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-2xl mb-1 block">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`text-center p-4 rounded-lg mb-6 ${
              isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isCorrect ? (
                <p className="font-comic font-bold">
                  🎉 Amazing! You're a Twitter sentiment expert! 🌟
                </p>
              ) : (
                <p className="font-comic font-bold">
                  The tweet's emotion was {
                    sentimentOptions.find(opt => opt.value === currentQuestion?.correctSentiment)?.label
                  }. Keep exploring! 💪
                </p>
              )}
            </div>
          )}

          {showFeedback && (
            <div className="text-center">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-comic font-bold hover:bg-blue-700 transition-colors duration-300 hover:scale-105 transform"
              >
                Next Tweet <FaArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
