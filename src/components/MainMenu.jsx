import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Shield, BookOpen, HelpCircle, Settings, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function MainMenu({
  onStartNewJourney,
  onContinueJourney,
  hasSaveGame,
  onOpenFormations,
  onOpenKnowledge,
  onOpenHowToPlay,
  onOpenSettings,
  isMuted,
  onToggleMute,
}) {
  const menuButtons = [
    {
      id: 'begin',
      label: 'Begin Journey',
      sanskrit: 'यात्रा आरम्भः',
      icon: Play,
      primary: true,
      onClick: onStartNewJourney,
    },
    ...(hasSaveGame
      ? [
          {
            id: 'continue',
            label: 'Continue Journey',
            sanskrit: 'यात्रा पुनःसञ्चारः',
            icon: RotateCcw,
            highlight: true,
            onClick: onContinueJourney,
          },
        ]
      : []),
    {
      id: 'formations',
      label: 'The Sacred Formations',
      sanskrit: 'पञ्च महाव्यूहाः',
      icon: Shield,
      onClick: onOpenFormations,
    },
    {
      id: 'knowledge',
      label: 'Mahabharata Knowledge',
      sanskrit: 'महाभारत ज्ञानकोशः',
      icon: BookOpen,
      onClick: onOpenKnowledge,
    },
    {
      id: 'howToPlay',
      label: 'How to Play',
      sanskrit: 'क्रीडा नियमम्',
      icon: HelpCircle,
      onClick: onOpenHowToPlay,
    },
    {
      id: 'settings',
      label: 'Settings & Sound',
      sanskrit: 'व्यवस्थापनम्',
      icon: Settings,
      onClick: onOpenSettings,
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-radial-temple flex flex-col items-center justify-between py-8 px-4 z-10 select-none">
      {/* Top Bar with Divine Audio Control */}
      <div className="w-full max-w-6xl flex items-center justify-between relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFD778] animate-ping" />
          <span className="text-xs font-cinzel text-[#FFD778] tracking-widest uppercase">
            Kurukshetra Sanctum
          </span>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            onToggleMute();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D6A64B]/40 bg-[#10102D]/80 text-[#FFD778] hover:border-[#FFD778] hover:bg-[#FFD778]/10 transition-all text-xs font-cinzel"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#7EDCEB]" />}
          <span className="hidden sm:inline">{isMuted ? "Sound Muted" : "Divine Chimes Active"}</span>
        </button>
      </div>

      {/* Central Rotating Sacred Mandala Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 md:opacity-25 z-0">
        <div className="w-[500px] h-[500px] md:w-[750px] md:h-[750px] relative">
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFD778] anim-chakra-cw">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" />
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
                <path d="M100 15 C108 45 108 65 100 95 C92 65 92 45 100 15 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <circle cx="100" cy="25" r="2" fill="#E68A24" />
              </g>
            ))}
            <circle cx="100" cy="100" r="45" fill="none" stroke="#E68A24" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="relative z-10 text-center mt-4 md:mt-8 flex flex-col items-center">
        {/* Sanskrit Inscription */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs md:text-sm font-sanskrit text-[#7EDCEB] tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(126,220,235,0.6)]"
        >
          यतो धर्मस्ततो जयः • WHERE THERE IS DHARMA, THERE IS VICTORY
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-black tracking-widest text-gold-gradient drop-shadow-[0_0_30px_rgba(255,215,120,0.5)]"
        >
          VYUHA
        </motion.h1>

        {/* Subtitle */}
        <div className="text-base sm:text-xl font-cinzel font-semibold tracking-[0.3em] text-[#FFD778] mt-1 mb-2">
          THE PATH OF WISDOM
        </div>

        <p className="text-xs sm:text-sm font-cinzel text-[#FFF1D0]/70 max-w-md italic">
          "Master the five sacred military formations through discerning choices and timeless insight."
        </p>

        {/* Peacock feather / Divine Lotus ornament */}
        <div className="flex items-center gap-3 my-4">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#FFD778] to-transparent" />
          <Sparkles className="w-4 h-4 text-[#FFD778]" />
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#FFD778] to-transparent" />
        </div>
      </div>

      {/* Ornate Interactive Menu Buttons */}
      <div className="relative z-10 w-full max-w-md flex flex-col gap-3.5 my-6">
        {menuButtons.map((btn, index) => {
          const Icon = btn.icon;
          return (
            <motion.button
              key={btn.id}
              onClick={() => {
                soundEngine.playClick();
                btn.onClick();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.025, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative group w-full py-3.5 px-6 rounded-lg text-left transition-all duration-300 overflow-hidden ${
                btn.primary
                  ? 'bg-gradient-to-r from-[#D6A64B] via-[#FFD778] to-[#E68A24] text-[#08091A] font-bold shadow-divine-glow border border-[#FFF1D0]'
                  : btn.highlight
                  ? 'bg-[#10102D]/95 text-[#FFD778] border-2 border-[#FFD778] shadow-[0_0_20px_rgba(255,215,120,0.3)]'
                  : 'bg-[#10102D]/85 text-[#FFF1D0] border border-[#D6A64B]/40 hover:border-[#FFD778] hover:bg-[#10102D]'
              }`}
            >
              {/* Subtle glowing trail on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

              {/* Ornate corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FFD778]/70" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FFD778]/70" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2 rounded-full ${
                      btn.primary
                        ? 'bg-[#08091A]/15 text-[#08091A]'
                        : 'bg-[#071A3A] text-[#FFD778] border border-[#D6A64B]/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div
                      className={`text-base font-cinzel tracking-wider ${
                        btn.primary ? 'font-bold text-[#08091A]' : 'font-semibold text-[#FFF1D0] group-hover:text-[#FFD778]'
                      }`}
                    >
                      {btn.label}
                    </div>
                    <div
                      className={`text-[11px] font-sanskrit ${
                        btn.primary ? 'text-[#08091A]/80' : 'text-[#D6A64B]/80'
                      }`}
                    >
                      {btn.sanskrit}
                    </div>
                  </div>
                </div>

                <div
                  className={`text-xs font-cinzel px-2.5 py-1 rounded transition-colors ${
                    btn.primary
                      ? 'bg-[#08091A] text-[#FFD778]'
                      : 'text-[#FFD778] opacity-60 group-hover:opacity-100'
                  }`}
                >
                  Enter ➔
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer Credentials & Ancient Quote */}
      <div className="relative z-10 text-center text-xs text-[#D6A64B]/60 font-cinzel max-w-xl">
        <p className="italic mb-1">
          "One who has conquered their mind has already reached the Supreme peace." — Bhagavad Gita
        </p>
        <span className="text-[10px] tracking-widest text-[#FFD778]/40 uppercase">
          Vyuha Interactive Mythological Game • Five Sacred Formations
        </span>
      </div>
    </div>
  );
}
