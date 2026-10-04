import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Timer from './Timer';
import { Sparkles, HelpCircle, Shield, Award } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function QuestionPanel({
  level,
  nodeIndex,
  question,
  onSubmitAnswer,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [remainingTime, setRemainingTime] = useState(level.timePerQuestion);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setRemainingTime(level.timePerQuestion);
  }, [question, level]);

  const handleSelectOption = (index) => {
    if (isAnswered) return;
    soundEngine.playClick();
    setSelectedOption(index);
    setIsAnswered(true);
    // Give brief tap feedback then trigger submit
    setTimeout(() => {
      onSubmitAnswer(index, remainingTime);
    }, 250);
  };

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    onSubmitAnswer(null, 0); // null indicates timed out
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center p-3 sm:p-6 z-10 select-none">
      {/* Question Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#10102D]/90 border-2 border-[#D6A64B]/50 rounded-2xl p-5 sm:p-7 shadow-divine-glow-lg backdrop-blur-md relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD778]/5 rounded-full filter blur-3xl pointer-events-none" />

        {/* Top Info Row: Gate Number, Theme, and Countdown Timer */}
        <div className="flex items-center justify-between gap-3 border-b border-[#D6A64B]/30 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#071A3A] border border-[#FFD778] text-[#FFD778] flex items-center justify-center font-cinzel font-bold text-xs shadow-divine-glow">
              {nodeIndex + 1}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-cinzel text-[#FFD778] tracking-widest uppercase">
                  Gate {nodeIndex + 1} of {level.questionCount}
                </span>
                <span className="text-[10px] font-sans px-2 py-0.5 rounded bg-[#071A3A] text-[#7EDCEB] border border-[#7EDCEB]/30">
                  {level.difficulty}
                </span>
              </div>
              <div className="text-xs text-[#FFF1D0]/70 font-sans">
                {level.name} • {level.theme}
              </div>
            </div>
          </div>

          {/* Countdown Timer Ring */}
          <Timer
            initialTime={level.timePerQuestion}
            onTimeUp={handleTimeUp}
            isPaused={isAnswered}
          />
        </div>

        {/* Scenario Dilemma Box */}
        <div className="my-2">
          <div className="text-xs font-cinzel text-[#FFD778] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E68A24]" />
            <span>Moral & Strategic Scenario</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-[#FFF1D0] font-sans font-medium leading-relaxed">
            {question.scenario}
          </p>
        </div>
      </motion.div>

      {/* Answer Choices Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
        {question.options.map((optionText, idx) => {
          const isChosen = selectedOption === idx;
          return (
            <motion.button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              onMouseEnter={() => soundEngine.playHover()}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.015, y: -2 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              className={`relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex items-start gap-3.5 shadow-md overflow-hidden ${
                isChosen
                  ? 'bg-gradient-to-r from-[#D6A64B] to-[#FFD778] text-[#08091A] border-[#FFF1D0] shadow-divine-glow font-semibold'
                  : 'bg-[#10102D]/85 hover:bg-[#10102D] text-[#FFF1D0] border-[#D6A64B]/40 hover:border-[#FFD778] hover:shadow-[0_0_15px_rgba(255,215,120,0.2)]'
              }`}
            >
              {/* Corner embellishment */}
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#FFD778]/50" />

              {/* Option Letter Badge */}
              <div
                className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-cinzel font-bold text-xs transition-colors ${
                  isChosen
                    ? 'bg-[#08091A] text-[#FFD778]'
                    : 'bg-[#071A3A] text-[#FFD778] border border-[#D6A64B]/50'
                }`}
              >
                {optionLabels[idx]}
              </div>

              {/* Option Text */}
              <span className="text-xs sm:text-sm font-sans leading-relaxed pt-0.5">
                {optionText}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Footer Guidance */}
      <div className="mt-4 text-center text-xs text-[#D6A64B]/70 font-cinzel">
        Evaluate the consequences before choosing. Wisdom demands thoughtful action.
      </div>
    </div>
  );
}
