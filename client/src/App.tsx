import { Routes, Route } from 'react-router-dom';
import { HomeScreen } from './components/home/HomeScreen';
import { SentenceActivity } from './components/activities/SentenceActivity';
import { MediaActivity } from './components/activities/MediaActivity';
import { TweetsActivity } from './components/activities/TweetsActivity';
import { StoryActivity } from './components/activities/StoryActivity';
import { MusicActivity } from './components/activities/MusicActivity';
import { ChatbotActivity } from './components/activities/ChatbotActivity';
import { ImageActivity } from './components/activities/ImageActivity';
import { GifActivity } from './components/activities/GifActivity';
import { VideoActivity } from './components/activities/VideoActivity';
import { StoryReader } from './components/activities/StoryReader';
import './App.css';

function App() {
  return (
    <div className="font-comic min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="fixed inset-0 -z-10 bg-[url('/stars.svg')] bg-repeat opacity-5"></div>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/activity/sentence" element={<SentenceActivity />} />
        <Route path="/activity/media" element={<MediaActivity />} />
        <Route path="/activity/media/image" element={<ImageActivity />} />
        <Route path="/activity/media/gif" element={<GifActivity />} />
        <Route path="/activity/media/video" element={<VideoActivity />} />
        <Route path="/activity/tweets" element={<TweetsActivity />} />
        <Route path="/activity/story" element={<StoryActivity />} />
        <Route path="/activity/story/:id" element={<StoryReader />} />
        <Route path="/activity/music" element={<MusicActivity />} />
        <Route path="/activity/chatbot" element={<ChatbotActivity />} />
      </Routes>
    </div>
  );
}

export default App
