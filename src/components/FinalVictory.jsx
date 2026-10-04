import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Award, RotateCcw, Home, Sun, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function FinalVictory({
  score,
  wisdomPoints,
  stats,
  onRestartNew,
  onBackToMenu,
}) {
  useEffect(() => {
    soundEngine.playVictory();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-6 z-10 select-none overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(230, 138, 36, 0.4) 0%, rgba(16, 16, 45, 0.9) 60%, rgba(5, 6, 20, 1) 100%)"
      }}
    >
      {/* Golden Sunrise Horizon Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[700px] h-[700px] rounded-full bg-radial-divine filter blur-3xl animate-pulse-subtle" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-2xl w-full bg-[#10102D]/95 border-2 border-[#FFD778] rounded-3xl p-6 sm:p-10 shadow-divine-glow-lg backdrop-blur-2xl text-center flex flex-col items-center"
      >
        {/* Ornate corner embellishments */}
        <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#FFD778]" />
        <div className="absolute -top-3 -right-3 w-10 h-10 border-t-4 border-r-4 border-[#FFD778]" />
        <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-4 border-l-4 border-[#FFD778]" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#FFD778]" />

        {/* Crown & Sun Aura */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#E68A24] via-[#FFD778] to-[#FFF1D0] flex items-center justify-center mb-4 shadow-[0_0_35px_rgba(255,215,120,0.9)] animate-pulse-subtle">
          <Crown className="w-10 h-10 text-[#08091A]" />
        </div>

        {/* Sanskrit Ultimate Victory Banner */}
        <div className="text-xs sm:text-sm font-sanskrit text-[#7EDCEB] tracking-widest uppercase mb-1">
          चक्रव्यूह विजयः • सर्वज्ञता मोक्षः
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-black tracking-wide text-gold-gradient mb-2">
          YOU HAVE CONQUERED THE CHAKRAVYUHA
        </h2>

        {/* Divine Epigraph */}
        <div className="w-full p-5 rounded-2xl bg-[#071A3A]/80 border border-[#D6A64B]/50 my-5 shadow-inner">
          <p className="text-base sm:text-lg text-[#FFD778] font-cinzel italic leading-relaxed">
            "True victory is not defeating every obstacle. It is choosing wisely when the path is uncertain."
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#FFF1D0]/90 font-sans leading-relaxed mb-6 max-w-lg">
          You have navigated the five sacred military formations of the Mahabharata. By harmonizing balance, fellowship, laser focus, ethical discernment, and ultimate inner courage, you have unlocked the timeless wisdom within.
        </p>

        {/* Journey Statistics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8 text-xs font-cinzel">
          <div className="p-3 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/30 flex flex-col items-center">
            <span className="text-[#FFF1D0]/70 mb-1">Final Score</span>
            <span className="font-bold text-[#FFD778] text-lg">{score}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/30 flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-[#7EDCEB] mb-1" />
            <span className="text-[#FFF1D0]/70">Wisdom</span>
            <span className="font-bold text-[#7EDCEB] text-lg">{wisdomPoints}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/30 flex flex-col items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[#FFF1D0]/70">Gates Mastered</span>
            <span className="font-bold text-emerald-300 text-lg">{stats.correctCount} / {stats.totalAnswered}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/30 flex flex-col items-center">
            <Sun className="w-4 h-4 text-[#E68A24] mb-1" />
            <span className="text-[#FFF1D0]/70">Vyuhas Cleared</span>
            <span className="font-bold text-[#FFD778] text-lg">5 / 5</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full">
          <button
            onClick={() => {
              soundEngine.playConch();
              onRestartNew();
            }}
            className="flex-1 py-3.5 px-6 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Embark Anew</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onBackToMenu();
            }}
            className="flex-1 py-3.5 px-6 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#FFF1D0] bg-[#071A3A] border border-[#D6A64B]/50 hover:bg-[#10102D] hover:border-[#FFD778] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-[#FFD778]" />
            <span>Main Menu</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
