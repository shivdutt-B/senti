import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { chatWithGemini } from '../../utils/gemini';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatbotActivity() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi! I'm EmotiBot! 🤖✨ I'm here to help you learn all about feelings and emotions! What would you like to know?",
    isBot: true,
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Convert messages to string array for history
      const history = messages.map(m => `${m.isBot ? 'EmotiBot' : 'User'}: ${m.text}`);
      
      const response = await chatWithGemini(inputMessage, history);
      
      const botMessage: Message = {
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        text: "Oops! I had a little trouble understanding that. Could you try asking me again? 🤔",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingIndicator = () => (
    <div className="flex items-center gap-2 text-gray-600 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
      <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center animate-bounce">
        <FaRobot className="text-white" />
      </div>
      <span className="font-comic">EmotiBot is thinking...</span>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 font-semibold text-gray-700 font-comic hover:scale-105"
          >
            <FaArrowLeft className="animate-bounce-custom" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center">
              <FaRobot className="text-white text-xl" />
            </div>
            <span className="font-comic font-bold text-gray-700">EmotiBot</span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <div 
            ref={chatContainerRef}
            className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl font-comic ${
                    message.isBot
                      ? 'bg-orange-100 text-gray-700'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask EmotiBot about feelings..."
              className="flex-1 px-4 py-3 rounded-full border-2 border-orange-200 focus:border-orange-400 focus:outline-none font-comic text-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`px-6 py-3 rounded-full font-comic font-bold flex items-center gap-2 transition-all duration-300 ${
                !inputMessage.trim() || isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 transform'
              }`}
            >
              Send <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
