# Senti: Kid-Friendly Sentiment Learning Platform 🌈

A playful and educational web application designed to help children understand emotions and sentiment through various interactive activities.

## 🌟 Features

### Interactive Activities
- **Sentence Analysis**: Learn to identify emotions in simple sentences
- **Media Recognition**: Understand sentiments in images, GIFs, and videos
- **Tweet Explorer**: Discover emotions in social media-style messages
- **Music Moods**: Connect emotions with different types of music
- **Story Time**: Read interactive stories with emotional context
- **AI Chatbot**: Have friendly conversations about feelings

### Kid-Friendly Design
- 📱 Responsive layout for all devices
- 🎨 Playful animations and transitions
- 🔤 Easy-to-read fonts and clear visuals
- 🎯 Immediate feedback and encouragement
- 📚 Book-like interface for stories

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for data storage)
- Google Cloud Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sentiment
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create `.env` files in both client and server directories:

**Client (.env)**:
```
VITE_API_URL=http://localhost:3000
```

**Server (.env)**:
```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
GEMINI_API_KEY=<your-gemini-api-key>
```

4. Start the development servers:

**Server**:
```bash
cd server
npm run dev
```

**Client**:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
sentiment/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/       # Static assets
│   │   ├── types/       # TypeScript type definitions
│   │   └── utils/       # Utility functions
│   └── public/          # Public assets
└── server/              # Backend Node.js application
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── models/     # Database models
    │   ├── routes/    # API routes
    │   ├── services/  # Business logic
    │   └── config/   # Configuration files
    └── index.ts      # Entry Point
```

## 🛠️ Technologies Used

### Frontend
- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with TypeScript
- Express.js for API server
- MongoDB for data storage
- Google Cloud Gemini API for AI features

## 📝 Activities Description

1. **Sentence Activity**
   - Analyzes simple sentences for emotional content
   - Uses AI to generate age-appropriate examples
   - Provides immediate feedback with animations

2. **Media Activity**
   - Displays images, GIFs, and videos
   - Interactive UI for sentiment selection
   - Visual feedback for correct/incorrect answers

3. **Tweets Activity**
   - Shows kid-friendly tweet-like messages
   - Helps identify emotions in written communication
   - Progressive difficulty levels

4. **Music Activity**
   - Associates music with different emotions
   - Interactive audio player with seek functionality
   - Visual feedback with animations

5. **Story Activity**
   - Interactive storybook interface
   - Beautiful page-turning animations
   - Emotional context for each page
   - Responsive design for all screen sizes

6. **Chatbot Activity**
   - AI-powered conversational interface
   - Kid-friendly responses
   - Educational dialogue about emotions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


