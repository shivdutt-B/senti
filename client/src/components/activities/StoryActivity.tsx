import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBook, FaBookReader } from 'react-icons/fa';
import axios from 'axios';

interface Storybook {
  id: string;
  title: string;
  coverPage: string;
}

export function StoryActivity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [storybooks, setStorybooks] = useState<Storybook[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);

  useEffect(() => {
    fetchStorybooks();
  }, []);

  const fetchStorybooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity4/storybooks`);
      setStorybooks(response.data);
    } catch (error) {
      console.error('Error fetching storybooks:', error);
      setError('Oops! We had trouble finding our storybooks. Let\'s try again! 📚');
    } finally {
      setLoading(false);
    }
  };

  const handleStorySelect = (storyId: string) => {
    navigate(`/activity/story/${storyId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <FaBook className="text-5xl text-green-400 animate-bounce" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-8 h-8 bg-green-200/30 rounded-full animate-ping" />
          </div>
        </div>
        <p className="font-comic text-xl text-gray-600">Finding magical stories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 font-semibold text-gray-700 font-comic hover:scale-105"
          >
            <FaArrowLeft className="animate-bounce" /> Back to Home
          </button>
          <h1 className="text-4xl font-fredoka font-bold text-gray-800 flex items-center gap-3">
            <span className="animate-float">📚</span> 
            Story Adventures
          </h1>
        </div>

        {error ? (
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <FaBookReader className="text-4xl text-red-400 mx-auto mb-4" />
            <p className="text-xl font-comic text-gray-700 mb-4">{error}</p>
            <button
              onClick={fetchStorybooks}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-comic hover:bg-green-600 transition-all duration-300 hover:scale-105 transform shadow-lg"
            >
              Let's Try Again! ✨
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storybooks.map((book, index) => (
              <div
                key={book.id}
                className="group relative"
                onMouseEnter={() => setHoveredBook(book.id)}
                onMouseLeave={() => setHoveredBook(null)}
                style={{ 
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div 
                  onClick={() => handleStorySelect(book.id)}
                  className="cursor-pointer transform transition-all duration-500 hover:scale-105"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl">
                    {/* Book Cover */}
                    <div className="aspect-[3/4] relative">
                      <img
                        src={book.coverPage}
                        alt={book.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-300" />
                    </div>

                    {/* Book Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                      <h3 className="text-2xl font-fredoka font-bold text-white mb-2">
                        {book.title}
                      </h3>
                      <p className="text-white/80 font-comic">
                        Click to start reading! ✨
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div 
                      className={`absolute inset-0 bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                    />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse delay-100" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && storybooks.length === 0 && (
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <FaBookReader className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-comic text-gray-700">
              No storybooks found! Check back later for new adventures! 📚✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
