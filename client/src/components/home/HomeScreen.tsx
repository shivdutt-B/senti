"use client"

import { useNavigate } from "react-router-dom"
import { ActivityButton } from "./ActivityButton"
import { FaComments, FaImage, FaTwitter, FaBook, FaMusic, FaRobot } from "react-icons/fa"

const activities = [
  {
    id: "sentence",
    title: "Sentence Fun",
    icon: FaComments,
    color: "from-pink-400 to-pink-600",
    hoverColor: "hover:from-pink-500 hover:to-pink-700",
    description: "Learn with super fun sentences! 💬",
  },
  {
    id: "media",
    title: "Picture Magic",
    icon: FaImage,
    color: "from-purple-400 to-purple-600",
    hoverColor: "hover:from-purple-500 hover:to-purple-700",
    description: "Explore magical images & videos! 🎨",
  },
  {
    id: "tweets",
    title: "Tweet Detective",
    icon: FaTwitter,
    color: "from-blue-400 to-blue-600",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
    description: "Discover cool social messages! 🐦",
  },
  {
    id: "story",
    title: "Story Adventure",
    icon: FaBook,
    color: "from-green-400 to-green-600",
    hoverColor: "hover:from-green-500 hover:to-green-700",
    description: "Read amazing story adventures! 📚",
  },
  {
    id: "music",
    title: "Music Feelings",
    icon: FaMusic,
    color: "from-orange-400 to-orange-600",
    hoverColor: "hover:from-orange-500 hover:to-orange-700",
    description: "Feel the awesome music vibes! 🎵",
  },
  {
    id: "chatbot",
    title: "Robot Friend",
    icon: FaRobot,
    color: "from-red-400 to-red-600",
    hoverColor: "hover:from-red-500 hover:to-red-700",
    description: "Chat with your robot buddy! 🤖",
  },
]

export function HomeScreen() {
  const navigate = useNavigate()

  const handleActivitySelect = (activityId: string) => {
    navigate(`/activity/${activityId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300/20 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-300/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-32 w-18 h-18 bg-green-300/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse delay-900"></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-orange-300/20 rounded-full animate-pulse delay-1100"></div>

        <div className="absolute top-20 right-1/4 w-8 h-8 bg-yellow-400/30 rotate-45 animate-spin delay-200"></div>
        <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-pink-400/30 rotate-45 animate-spin delay-400"></div>
        <div className="absolute top-2/3 right-10 w-10 h-10 bg-blue-400/30 rotate-45 animate-spin delay-600"></div>

        <div className="absolute top-16 left-1/2 w-32 h-16 bg-white/30 rounded-full animate-float delay-800"></div>
        <div className="absolute bottom-24 right-1/4 w-28 h-14 bg-white/25 rounded-full animate-float delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-fredoka font-extrabold text-gray-800 mb-4">
            🌈 Sentiment Adventures! ✨
          </h1>
          <div className="flex justify-center items-center gap-2 mb-4">
            <p className="text-xl md:text-2xl font-comic text-gray-600 font-bold">Let's learn about Sentiments together!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {activities.map((activity, index) => (
            <div key={activity.id} className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
              <ActivityButton
                id={activity.id}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                color={activity.color}
                hoverColor={activity.hoverColor}
                onClick={() => handleActivitySelect(activity.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
