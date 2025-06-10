export default function CentralEmblem() {
  return (
    <div className="relative">
      {/* Main emblem container */}
      <div className="w-64 h-64 md:w-80 md:h-80 relative">
        {/* Outer glow ring - lighter */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/60 via-blue-200/60 to-pink-200/60 blur-xl animate-pulse" />

        {/* Inner emblem */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-100/80 via-purple-100/80 to-pink-100/80 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg">
          {/* Center content */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Ambient
            </div>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto my-3" />
            <div className="text-2xl md:text-3xl font-light text-gray-700">Thoughts</div>
          </div>
        </div>

        {/* Orbiting particles - lighter */}
        <div className="absolute w-full h-full animate-spin-slow">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-300/70 rounded-full blur-sm" />
        </div>
        <div className="absolute w-full h-full animate-spin-slower">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-300/70 rounded-full blur-md" />
        </div>
        <div className="absolute w-full h-full animate-spin-reverse">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-pink-300/70 rounded-full blur-sm" />
        </div>
        <div className="absolute w-full h-full animate-spin-reverse-slow">
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4 h-4 bg-cyan-300/70 rounded-full blur-md" />
        </div>
      </div>
    </div>
  )
}
