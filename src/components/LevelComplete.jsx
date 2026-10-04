import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function LevelComplete({
  level,
  score,
  wisdomPoints,
  lives,
  onNextLevel,
}) {
  useEffect(() => {
    soundEngine.playVictory();
  }, [level]);

  return (
    <div className="relative w-full min-h-screen bg-radial-temple flex flex-col items-center justify-center p-4 sm:p-6 z-10 select-none overflow-hidden">
      {/* Golden Expanding Gateway Rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-[600px] h-[600px] rounded-full bg-radial-divine filter blur-3xl animate-pulse-subtle" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full bg-[#10102D]/95 border-2 border-[#FFD778] rounded-2xl p-6 sm:p-10 shadow-divine-glow-lg backdrop-blur-xl text-center flex flex-col items-center"
      >
        {/* Ornate corner brackets */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[#FFD778]" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-[#FFD778]" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-[#FFD778]" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[#FFD778]" />

        {/* Golden Trophy Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#071A3A] via-[#10102D] to-[#E68A24] border-2 border-[#FFD778] flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(255,215,120,0.8)]">
          <Award className="w-8 h-8 text-[#FFD778]" />
        </div>

        {/* Sanskrit Victory Header */}
        <div className="text-xs font-sanskrit text-[#7EDCEB] tracking-widest uppercase mb-1">
          व्यूह विजयः • FORMATION CONQUERED
        </div>

        <h2 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-gold-gradient mb-2">
          {level.name} Conquered!
        </h2>

        <div className="text-sm font-cinzel text-[#FFD778] tracking-widest uppercase mb-5">
          {level.meaning}
        </div>

        {/* Exit Narration Scroll Box */}
        <div className="w-full p-5 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/40 mb-6 shadow-inner text-center">
          <p className="text-sm sm:text-base text-[#FFF1D0] leading-relaxed font-sans italic">
            "{level.exitNarration}"
          </p>
        </div>

        {/* Score & Achievements Metrics */}
        <div className="grid grid-cols-3 gap-3 w-full mb-8 text-xs font-cinzel">
          <div className="p-3 rounded-lg bg-[#071A3A]/60 border border-[#D6A64B]/30 flex flex-col items-center">
            <span className="text-[#FFF1D0]/70 mb-1">Total Score</span>
            <span className="font-bold text-[#FFD778] text-base">{score}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#071A3A]/60 border border-[#D6A64B]/30 flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-[#7EDCEB] mb-1" />
            <span className="text-[#FFF1D0]/70">Wisdom Points</span>
            <span className="font-bold text-[#7EDCEB] text-base">+{wisdomPoints}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#071A3A]/60 border border-[#D6A64B]/30 flex flex-col items-center">
            <Heart className="w-4 h-4 text-red-400 mb-1" />
            <span className="text-[#FFF1D0]/70">Prana Preserved</span>
            <span className="font-bold text-[#FFD778] text-base">{lives} / 3</span>
          </div>
        </div>

        {/* Next Formation Button */}
        <motion.button
          onClick={() => {
            soundEngine.playConch();
            onNextLevel();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full sm:w-auto px-10 py-4 rounded-full font-cinzel font-bold text-sm sm:text-base tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:shadow-divine-glow-lg transition-all flex items-center justify-center gap-3"
        >
          <ShieldCheck className="w-5 h-5 text-[#08091A]" />
          <span>PROCEED TO NEXT VYUHA</span>
          <ArrowRight className="w-5 h-5 text-[#08091A]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
