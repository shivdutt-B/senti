import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaBook, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import "../../App.css"

interface StoryPage {
  pageNo: number;
  content: string;
  mediaUrl: string;
  sentiment: string;
}

interface Story {
  id: string;
  title: string;
  coverPage: string;
  pages: StoryPage[];
}

export function StoryReader() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // 0 is cover page, 1+ are story pages
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/activity4/story/${id}`);
      setStory(response.data);
    } catch (error) {
      console.error('Error fetching story:', error);
      setError('Oops! We couldn\'t find this story. Let\'s try another one! 📚');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (!story) return;
    
    setIsFlipping(true);
    const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    
    // Ensure page is within bounds (cover page + story pages)
    if (nextPage >= 0 && nextPage <= story.pages.length) {
      setCurrentPage(nextPage);
    }
    
    setTimeout(() => setIsFlipping(false), 500); // Match with CSS animation duration
  };

  const getSentimentEmoji = (sentiment: string) => {
    const emojiMap: { [key: string]: string } = {
      joy: '😊',
      sadness: '😢',
      fear: '😨',
      anger: '😠',
      surprise: '😲',
      disgust: '🤢',
      hope: '🌟',
      love: '❤️',
      excitement: '✨',
      triumph: '🏆',
      encouragement: '💪',
      friendship: '🤝',
      neutral: '😐'
    };
    return emojiMap[sentiment.toLowerCase()] || '📖';
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
        <p className="font-comic text-xl text-gray-600">Opening your storybook...</p>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-8 flex flex-col items-center justify-center">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md">
          <FaBook className="text-4xl text-red-400 mx-auto mb-4" />
          <p className="text-xl font-comic text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/activity/story')}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-comic hover:bg-green-600 transition-all duration-300 hover:scale-105 transform shadow-lg"
          >
            Back to Library ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/activity/story')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 font-semibold text-gray-700 font-comic hover:scale-105"
          >
            <FaArrowLeft className="animate-bounce" /> Back
          </button>
          <h1 className="text-3xl font-fredoka font-bold text-gray-800">
            {story.title}
          </h1>
        </div>

        <div className="relative w-full book-outer-container">
          <div className={`book-container ${isFlipping ? 'flipping' : ''}`}>
            {/* Left Page (Image) */}
            <div className="book-page left-page">
              <div className="page-decorations">
                <span className="decoration decoration-1">✨</span>
                <span className="decoration decoration-2">🌟</span>
              </div>
              {currentPage === 0 ? (
                <div className="cover-content">
                  <img 
                    src={story.coverPage} 
                    alt="Book Cover"
                    className="w-full h-auto max-h-[80%] object-contain rounded-xl shadow-lg"
                  />
                </div>
              ) : (
                <>
                  <img 
                    src={story.pages[currentPage - 1].mediaUrl} 
                    alt={`Page ${currentPage}`}
                    className="w-full h-full object-contain md:object-cover"
                  />
                </>
              )}
              <div className="page-corner"></div>
            </div>

            {/* Right Page (Content) */}
            <div className="book-page right-page">
              <div className="page-content overflow-y-auto">
                {currentPage === 0 ? (
                  <div className="cover-content">
                    <h2 className="text-3xl md:text-4xl font-fredoka font-bold text-gray-800 mb-4 md:mb-6 animate-float" style={{ animationDelay: '0.2s' }}>
                      {story.title}
                    </h2>
                    <p className="font-comic text-lg md:text-xl text-gray-600 mb-6 md:mb-8 animate-float" style={{ animationDelay: '0.4s' }}>
                      Let's begin our magical journey! ✨
                    </p>
                    <div className="mt-2 md:mt-4 transform hover:scale-110 transition-transform">
                      <button
                        onClick={() => handlePageChange('next')}
                        className="px-5 md:px-6 py-2 md:py-3 bg-green-500 text-white rounded-full font-comic hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2"
                      >
                        Start Reading <FaChevronRight />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="story-content">
                    <p className="text-lg md:text-2xl font-comic text-gray-700 mb-4 md:mb-6 leading-relaxed">
                      {story.pages[currentPage - 1].content}
                    </p>
                    <div className="">
                      <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-comic">
                        <span className="text-gray-600">Feeling:</span>
                        <div className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center gap-2 shadow-md transform hover:scale-105 transition-transform">
                          <span className="text-xl md:text-2xl">{getSentimentEmoji(story.pages[currentPage - 1].sentiment)}</span>
                          <span className="font-bold text-green-800 capitalize text-sm md:text-base">
                            {story.pages[currentPage - 1].sentiment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="page-corner"></div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="nav-controls">
            <button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
              className="nav-button"
              aria-label="Previous page"
            >
              <FaChevronLeft className="text-xl md:text-2xl text-green-600" />
            </button>
            <div className="px-4 md:px-6 py-1 md:py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg font-comic text-sm md:text-base text-gray-700">
              Page {currentPage} of {story.pages.length}
            </div>
            <button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === story.pages.length}
              className="nav-button"
              aria-label="Next page"
            >
              <FaChevronRight className="text-xl md:text-2xl text-green-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
