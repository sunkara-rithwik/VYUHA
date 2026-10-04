import React from 'react';
import { Volume2, VolumeX, Settings, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function GameHeader({
  level,
  currentNodeIndex,
  lives,
  score,
  wisdomPoints,
  onOpenSettings,
  onBackToMenu,
  isMuted,
  onToggleMute,
}) {
  return (
    <header className="relative z-20 w-full px-4 py-3 bg-[#08091A]/85 backdrop-blur-md border-b border-[#D6A64B]/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back / Menu & Formation Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEngine.playClick();
              onBackToMenu();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs md:text-sm font-cinzel text-[#FFD778] border border-[#D6A64B]/40 hover:border-[#FFD778] hover:bg-[#FFD778]/10 transition-all"
            title="Return to Menu"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Menu</span>
          </button>

          {level && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-cinzel font-bold text-[#FFD778] tracking-wide">
                  {level.name}
                </span>
                <span className="hidden md:inline-block text-xs font-sanskrit px-2 py-0.5 rounded bg-[#10102D] text-[#7EDCEB] border border-[#7EDCEB]/30">
                  {level.sanskrit}
                </span>
              </div>
              <span className="text-[11px] text-[#D6A64B]/80 font-sans hidden sm:inline">
                Gate {currentNodeIndex + 1} of {level.questionCount} • {level.theme}
              </span>
            </div>
          )}
        </div>

        {/* Center: Lives System (Glowing Sacred Lotuses / Flames) */}
        <div className="flex items-center gap-2 bg-[#10102D]/90 px-3 py-1.5 rounded-full border border-[#D6A64B]/40 shadow-inner">
          <span className="text-xs font-cinzel text-[#D6A64B] hidden sm:inline font-semibold">
            Prana:
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((heartIndex) => {
              const hasLife = heartIndex <= lives;
              return (
                <div
                  key={heartIndex}
                  className={`relative transition-all duration-500 transform ${
                    hasLife ? 'scale-100 opacity-100' : 'scale-75 opacity-25 filter grayscale'
                  }`}
                  title={hasLife ? 'Sacred Life Active' : 'Life Lost'}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
                      hasLife
                        ? 'fill-[#FFD778] drop-shadow-[0_0_8px_rgba(255,215,120,0.8)] stroke-[#E68A24]'
                        : 'fill-gray-600 stroke-gray-500'
                    }`}
                  >
                    {/* Stylized Sacred Lotus / Flame of Life */}
                    <path
                      d="M12 2C12 2 14.5 6 15 9C15.5 12 14.5 14 12 17C9.5 14 8.5 12 9 9C9.5 6 12 2 12 2Z"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M12 17C15 15.5 19 15 19.5 11C20 7 17 5 17 5C17 5 16 9 14 12C13 13.5 12 17 12 17Z"
                      strokeWidth="1.2"
                      opacity="0.85"
                    />
                    <path
                      d="M12 17C9 15.5 5 15 4.5 11C4 7 7 5 7 5C7 5 8 9 10 12C11 13.5 12 17 12 17Z"
                      strokeWidth="1.2"
                      opacity="0.85"
                    />
                    <circle cx="12" cy="18" r="1.5" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Score, Wisdom Points, Sound & Settings */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#071A3A] border border-[#7EDCEB]/40 text-[#7EDCEB] text-xs font-cinzel">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wisdom: {wisdomPoints}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#10102D] border border-[#D6A64B]/50 text-[#FFD778] text-xs md:text-sm font-cinzel font-bold shadow-[0_0_10px_rgba(255,215,120,0.15)]">
            <span className="text-[#D6A64B] hidden sm:inline">Score:</span>
            <span>{score}</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onToggleMute();
            }}
            className="p-1.5 rounded text-[#FFD778] border border-[#D6A64B]/40 hover:border-[#FFD778] hover:bg-[#FFD778]/10 transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenSettings();
            }}
            className="p-1.5 rounded text-[#FFD778] border border-[#D6A64B]/40 hover:border-[#FFD778] hover:bg-[#FFD778]/10 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
