import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, HelpCircle, CheckCircle, XCircle, Feather, ShieldCheck } from 'lucide-react';
import { MAHABHARATA_QUESTIONS } from '../data/mahabharataQuestions';
import { soundEngine } from '../utils/soundEngine';

export default function KrishnaBlessing({ onCompleteBlessing }) {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isChallengeFailed, setIsChallengeFailed] = useState(false);
  const [isChallengeWon, setIsChallengeWon] = useState(false);

  // Pick 3 random distinct questions upon mount
  useEffect(() => {
    soundEngine.playKrishnaBlessing();
    const shuffled = [...MAHABHARATA_QUESTIONS].sort(() => 0.5 - Math.random());
    setTriviaQuestions(shuffled.slice(0, 3));
  }, []);

  const currentQ = triviaQuestions[currentQIndex];

  const handleSelectAnswer = (optionIdx) => {
    if (isAnswered || !currentQ) return;
    setSelectedAnswer(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      soundEngine.playCorrect();
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);

      setTimeout(() => {
        if (currentQIndex + 1 < 3) {
          // Move to next trivia question
          setCurrentQIndex((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          // All 3 answered correctly! Triumph!
          soundEngine.playVictory();
          setIsChallengeWon(true);
        }
      }, 1200);
    } else {
      soundEngine.playIncorrect();
      setTimeout(() => {
        setIsChallengeFailed(true);
      }, 1200);
    }
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="relative w-full min-h-screen bg-radial-temple flex flex-col items-center justify-center p-4 sm:p-6 z-10 select-none overflow-hidden">
      {/* Background Divine Peacock Feather Aura & Golden Rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[500px] h-[500px] rounded-full bg-radial-divine filter blur-2xl animate-pulse-subtle" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 max-w-2xl w-full bg-[#10102D]/95 border-2 border-[#FFD778] rounded-2xl p-6 sm:p-10 shadow-divine-glow-lg backdrop-blur-xl text-center flex flex-col items-center"
      >
        {/* Peacock Feather / Divine Flute Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#071A3A] via-[#10102D] to-[#E68A24] border-2 border-[#FFD778] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,215,120,0.8)] animate-bounce">
          <Feather className="w-8 h-8 text-[#7EDCEB]" />
        </div>

        {/* Header Title */}
        <div className="text-xs font-sanskrit text-[#7EDCEB] tracking-widest uppercase mb-1">
          श्रीकृष्ण कृपा • KRISHNA'S BLESSING
        </div>

        <h2 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wide text-gold-gradient mb-2">
          KRISHNA'S BLESSING
        </h2>

        <p className="text-xs sm:text-sm text-[#FFD778]/90 font-cinzel italic max-w-lg mb-6">
          "Your journey is not yet over. Prove your knowledge of the Mahabharata and receive another chance."
        </p>

        {/* Progress Tracker (3 Dots) */}
        <div className="flex items-center gap-3 mb-6">
          {[0, 1, 2].map((stepIdx) => {
            const isDone = stepIdx < correctCount;
            const isCurrent = stepIdx === currentQIndex && !isChallengeWon && !isChallengeFailed;
            return (
              <div
                key={stepIdx}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isDone
                    ? 'bg-[#7EDCEB] shadow-[0_0_10px_#7EDCEB]'
                    : isCurrent
                    ? 'bg-[#FFD778] scale-125 shadow-divine-glow animate-pulse'
                    : 'bg-gray-700'
                }`}
              />
            );
          })}
        </div>

        {/* Outcome View: Victory */}
        {isChallengeWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#7EDCEB]/20 border-2 border-[#7EDCEB] flex items-center justify-center text-[#7EDCEB] mb-3 shadow-divine-glow">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#FFD778] mb-2">
              Divine Grace Restored!
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF1D0] mb-6 max-w-md">
              Through your reverence and wisdom of the epic tradition, you have earned Lord Krishna's blessing. 1 Sacred Life has been restored.
            </p>
            <button
              onClick={() => onCompleteBlessing(true)}
              className="px-8 py-3 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:scale-105 transition-all"
            >
              Resume Journey
            </button>
          </motion.div>
        )}

        {/* Outcome View: Failure */}
        {isChallengeFailed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-4"
          >
            <div className="w-16 h-16 rounded-full bg-red-950/40 border-2 border-red-500 flex items-center justify-center text-red-400 mb-3">
              <XCircle className="w-9 h-9" />
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-red-400 mb-2">
              The Blessing Vanishes
            </h3>
            <p className="text-xs sm:text-sm text-[#FFF1D0]/80 mb-6 max-w-md">
              An incorrect response ends the divine trial. Your journey reaches its twilight, but eternal wisdom awaits your next endeavor.
            </p>
            <button
              onClick={() => onCompleteBlessing(false)}
              className="px-8 py-3 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#FFF1D0] bg-[#071A3A] border border-[#D6A64B] hover:bg-[#10102D] transition-all"
            >
              Accept Destiny
            </button>
          </motion.div>
        )}

        {/* Active Trivia Question View */}
        {!isChallengeWon && !isChallengeFailed && currentQ && (
          <div className="w-full flex flex-col items-center">
            {/* Question Box */}
            <div className="w-full p-4 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/40 mb-5 shadow-inner">
              <span className="text-[11px] font-cinzel text-[#FFD778] uppercase tracking-wider block mb-1.5">
                Trial Question {currentQIndex + 1} of 3
              </span>
              <p className="text-sm sm:text-base font-sans font-medium text-[#FFF1D0] leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Answer Choices */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'bg-[#10102D]/90 border-[#D6A64B]/40 text-[#FFF1D0] hover:border-[#FFD778]';
                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.5)]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
                  } else if (isCorrect) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-400/80 text-emerald-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={isAnswered}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-center gap-3 transition-all ${btnStyle}`}
                  >
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[#071A3A] border border-[#FFD778]/50 text-[#FFD778] flex items-center justify-center font-cinzel font-bold text-xs">
                      {optionLabels[idx]}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Fact note when answered */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-[#7EDCEB] font-sans italic max-w-lg mt-1"
              >
                📜 {currentQ.fact}
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
