import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function FormationEntry({ level, onEnterFormation }) {
  useEffect(() => {
    soundEngine.playConch();
  }, [level]);

  return (
    <div className="relative w-full min-h-screen bg-radial-temple flex flex-col items-center justify-center p-4 sm:p-6 z-10 select-none overflow-hidden">
      {/* Decorative Golden Temple Gateway Arches */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <svg viewBox="0 0 800 600" className="w-full max-w-4xl text-[#D6A64B]">
          {/* Temple Torana Arch */}
          <path
            d="M 150 550 L 150 250 Q 150 100 400 100 Q 650 100 650 250 L 650 550"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <path
            d="M 180 550 L 180 260 Q 180 130 400 130 Q 620 130 620 260 L 620 550"
            fill="none"
            stroke="#FFD778"
            strokeWidth="1.5"
          />
          {/* Kalasha on top of the arch */}
          <circle cx="400" cy="80" r="14" fill="#FFD778" opacity="0.6" />
          <polygon points="400,50 392,72 408,72" fill="#E68A24" />
        </svg>
      </div>

      {/* Main Ornate Gateway Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full bg-[#10102D]/90 border-2 border-[#D6A64B] rounded-2xl p-6 sm:p-10 shadow-divine-glow-lg backdrop-blur-xl text-center flex flex-col items-center"
      >
        {/* Ornate corner embellishments */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[#FFD778]" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-[#FFD778]" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-[#FFD778]" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[#FFD778]" />

        {/* Level Badge */}
        <div className="px-4 py-1 rounded-full bg-[#071A3A] border border-[#7EDCEB]/60 text-[#7EDCEB] text-xs font-cinzel font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
          <span>Level {level.id} of 5</span>
          <span>•</span>
          <span style={{ color: level.difficultyColor }}>{level.difficulty} Difficulty</span>
        </div>

        {/* Sanskrit Name */}
        <div className="text-xl sm:text-2xl font-sanskrit text-[#7EDCEB] tracking-wider mb-1">
          {level.sanskrit}
        </div>

        {/* Primary Formation Name */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold-gradient tracking-wide mb-2">
          {level.name}
        </h2>

        {/* Subtitle / Meaning */}
        <div className="text-sm sm:text-base font-cinzel text-[#FFD778] tracking-widest uppercase mb-6">
          {level.meaning}
        </div>

        {/* Narration Sacred Scroll Box */}
        <div className="relative w-full p-5 sm:p-6 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/40 mb-6 shadow-inner">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-[#10102D] border border-[#FFD778]/50 text-[10px] font-cinzel text-[#FFD778] tracking-wider uppercase">
            Sacred Narration
          </div>
          <p className="text-sm sm:text-base text-[#FFF1D0] leading-relaxed font-sans italic">
            "{level.entryNarration}"
          </p>
        </div>

        {/* Tactical Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8 text-xs font-cinzel">
          <div className="p-3 rounded-lg bg-[#071A3A]/60 border border-[#D6A64B]/30 flex flex-col items-center">
            <HelpCircle className="w-4 h-4 text-[#7EDCEB] mb-1" />
            <span className="text-[#FFF1D0]/70">Challenges</span>
            <span className="font-bold text-[#FFD778] text-sm">{level.questionCount} Gates</span>
          </div>

          <div className="p-3 rounded-lg bg-[#071A3A]/60 border border-[#D6A64B]/30 flex flex-col items-center">
            <Clock className="w-4 h-4 text-[#E68A24] mb-1" />
            <span className="text-[#FFF1D0]/70">Pace</span>
            <span className="font-bold text-[#FFD778] text-sm">{level.timePerQuestion}s / gate</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-[#071A3A]/60 border border-[#D6A64B]/30 flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-[#FFD778] mb-1" />
            <span className="text-[#FFF1D0]/70">Inner Theme</span>
            <span className="font-bold text-[#FFD778] text-xs text-center line-clamp-1">{level.theme.split(',')[0]}</span>
          </div>
        </div>

        {/* Enter Formation Button */}
        <motion.button
          onClick={() => {
            soundEngine.playClick();
            onEnterFormation();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full sm:w-auto px-10 py-4 rounded-full font-cinzel font-bold text-base sm:text-lg tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:shadow-divine-glow-lg transition-all flex items-center justify-center gap-3"
        >
          <Shield className="w-5 h-5 text-[#08091A]" />
          <span>ENTER THE FORMATION</span>
          <ArrowRight className="w-5 h-5 text-[#08091A]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
