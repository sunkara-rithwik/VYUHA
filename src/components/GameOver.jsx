import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Sparkles, AlertTriangle } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function GameOver({
  level,
  score,
  wisdomPoints,
  onRetryLevel,
  onBackToMenu,
}) {
  return (
    <div className="relative w-full min-h-screen bg-radial-temple flex flex-col items-center justify-center p-4 sm:p-6 z-10 select-none overflow-hidden">
      {/* Somber Twilight Battlefield Background */}
      <div className="absolute inset-0 bg-[#08050e]/90 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-xl w-full bg-[#10102D]/95 border-2 border-[#E68A24]/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center flex flex-col items-center"
      >
        {/* Crest */}
        <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-500/50 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="text-xs font-sanskrit text-[#E68A24] tracking-widest uppercase mb-1">
          पुनर्प्रयासः • DEFEAT IS NOT FINALITY
        </div>

        <h2 className="text-3xl sm:text-4xl font-cinzel font-black tracking-wide text-[#FFF1D0] mb-2">
          Formation Overwhelmed
        </h2>

        <p className="text-xs sm:text-sm text-[#FFD778]/80 font-cinzel italic max-w-md mb-6">
          "The greatest warriors in the Mahabharata faced moments of collapse. True wisdom is rising with fresh resolve."
        </p>

        {/* Stats summary */}
        <div className="grid grid-cols-2 gap-3 w-full mb-8 text-xs font-cinzel">
          <div className="p-3 rounded-lg bg-[#071A3A]/70 border border-[#D6A64B]/30 flex flex-col items-center">
            <span className="text-[#FFF1D0]/70 mb-1">Points Gathered</span>
            <span className="font-bold text-[#FFD778] text-base">{score}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#071A3A]/70 border border-[#D6A64B]/30 flex flex-col items-center">
            <span className="text-[#FFF1D0]/70 mb-1">Wisdom Points</span>
            <span className="font-bold text-[#7EDCEB] text-base">{wisdomPoints}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full">
          <button
            onClick={() => {
              soundEngine.playClick();
              onRetryLevel();
            }}
            className="flex-1 py-3 px-6 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] to-[#E68A24] shadow-divine-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Formation</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onBackToMenu();
            }}
            className="flex-1 py-3 px-6 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#FFF1D0] bg-[#071A3A] border border-[#D6A64B]/50 hover:bg-[#10102D] hover:border-[#FFD778] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#FFD778]" />
            <span>Return to Menu</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
