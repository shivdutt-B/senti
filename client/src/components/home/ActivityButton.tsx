"use client"
import type { IconType } from "react-icons"

interface ActivityButtonProps {
  id: string
  title: string
  icon: IconType
  color: string
  hoverColor: string
  description: string
  onClick: () => void
}

export function ActivityButton({ title, icon: Icon, color, hoverColor, description, onClick }: ActivityButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${color} ${hoverColor} p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu hover:rotate-1 w-full h-64 flex flex-col justify-center`}
    >
      <div className="relative z-10 text-center text-white">
        <div className="mb-4 flex justify-center">
          <Icon className="text-5xl md:text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h3 className="text-2xl md:text-3xl font-black mb-2 font-fredoka">{title}</h3>
        <p className="text-sm md:text-base font-semibold opacity-90 font-comic">{description}</p>
      </div>

      <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full animate-pulse">
        <div className="absolute inset-1 bg-yellow-300/40 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/15 rounded-full animate-pulse delay-300">
        <div className="absolute inset-1 bg-pink-300/40 rounded-full animate-spin"></div>
      </div>
      <div className="absolute top-1/2 left-2 w-4 h-4 bg-white/10 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-1/2 right-4 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-700"></div>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="w-2 h-2 bg-white/30 rotate-45 animate-pulse delay-200"></div>
      </div>
      <div className="absolute bottom-6 right-6">
        <div className="w-3 h-3 bg-yellow-200/40 rotate-45 animate-pulse delay-400"></div>
      </div>
      <div className="absolute top-1/3 right-2">
        <div className="w-2 h-2 bg-white/25 rotate-45 animate-pulse delay-600"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-pulse"></div>

      <div className="absolute inset-0 rounded-3xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-300"></div>
    </button>
  )
}
