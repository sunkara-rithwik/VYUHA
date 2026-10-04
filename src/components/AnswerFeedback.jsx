import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, BookOpen, ArrowRight, ShieldAlert, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function AnswerFeedback({
  feedback,
  onProceed,
  lives,
}) {
  const {
    isCorrect,
    selectedOption,
    correctOption,
    explanation,
    virtue,
    gitaQuote,
    pointsAwarded,
    speedBonus,
  } = feedback;

  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center p-3 sm:p-6 z-10 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full rounded-2xl p-6 sm:p-8 backdrop-blur-xl border-2 shadow-2xl relative overflow-hidden ${
          isCorrect
            ? 'bg-[#071A3A]/95 border-[#7EDCEB] shadow-[0_0_40px_rgba(126,220,235,0.35)]'
            : 'bg-[#1a0c16]/95 border-[#E68A24] shadow-[0_0_40px_rgba(230,138,36,0.35)]'
        }`}
      >
        {/* Banner Status Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[#D6A64B]/30">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              isCorrect
                ? 'bg-[#7EDCEB]/20 text-[#7EDCEB] border border-[#7EDCEB]'
                : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
          </div>

          <div>
            <h3
              className={`text-xl sm:text-2xl font-cinzel font-bold tracking-wide ${
                isCorrect ? 'text-[#7EDCEB]' : 'text-red-400'
              }`}
            >
              {isCorrect ? 'Path of Wisdom Reaffirmed!' : 'A Misstep in Judgment'}
            </h3>
            <span className="text-xs text-[#FFF1D0]/70 font-sans">
              {isCorrect
                ? `Gate Successfully Breached • +${pointsAwarded} Points (Speed Bonus: +${speedBonus})`
                : `1 Sacred Life Lost • ${lives} Remaining`}
            </span>
          </div>
        </div>

        {/* Selected Answer Review */}
        <div className="mb-5 space-y-2.5 text-xs sm:text-sm">
          {!isCorrect && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-200">
              <span className="font-cinzel text-red-400 font-bold block mb-0.5">Your Choice:</span>
              <span>{selectedOption}</span>
            </div>
          )}

          <div
            className={`p-3.5 rounded-lg border ${
              isCorrect
                ? 'bg-[#10102D]/80 border-[#7EDCEB]/40 text-[#FFF1D0]'
                : 'bg-[#10102D]/80 border-[#FFD778]/40 text-[#FFF1D0]'
            }`}
          >
            <span className="font-cinzel text-[#FFD778] font-bold block mb-0.5">
              {isCorrect ? 'Wise Decision:' : 'The Righteous Course:'}
            </span>
            <span className="leading-relaxed">{correctOption}</span>
          </div>
        </div>

        {/* In-depth Philosophical & Practical Explanation */}
        <div className="p-4 rounded-xl bg-[#080a1c]/90 border border-[#D6A64B]/40 mb-5 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs font-cinzel text-[#FFD778] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E68A24]" />
            <span>Why This Choice Matters</span>
          </div>
          <p className="text-xs sm:text-sm text-[#FFF1D0]/90 leading-relaxed font-sans">
            {explanation}
          </p>
        </div>

        {/* Wisdom Virtue & Gita Quote Accordion */}
        {(virtue || gitaQuote) && (
          <div className="p-4 rounded-xl bg-[#10102D]/80 border border-[#7EDCEB]/30 mb-6">
            {virtue && (
              <div className="flex items-center gap-2 mb-1.5 text-xs font-cinzel text-[#7EDCEB]">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="font-bold">Virtue in Focus:</span>
                <span className="text-[#FFF1D0]">{virtue}</span>
              </div>
            )}
            {gitaQuote && (
              <div className="flex items-start gap-2 text-xs italic text-[#FFD778]/90 font-serif leading-relaxed mt-1">
                <BookOpen className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D6A64B]" />
                <span>"{gitaQuote}"</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button: Continue */}
        <div className="flex justify-end">
          <motion.button
            onClick={() => {
              soundEngine.playClick();
              onProceed();
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-8 py-3 rounded-full font-cinzel font-bold text-sm tracking-wider text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:shadow-divine-glow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>{isCorrect ? 'Advance to Next Gateway' : 'Reflect & Re-engage'}</span>
            <ArrowRight className="w-4 h-4 text-[#08091A]" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
