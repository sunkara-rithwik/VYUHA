import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Clock, Heart, Feather, Sparkles, Navigation, Target } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function HowToPlay({ onBack, onStartPlaying }) {
  const steps = [
    {
      title: "1. The Five Sacred Formations",
      icon: Shield,
      color: "#7EDCEB",
      text: "Journey through five progressively demanding military formations from the Kurukshetra War: Ardhachandra (Crescent), Garuda (Eagle), Suchimukha (Needle), Padma (Lotus), and the legendary Chakravyuha (Wheel of Destiny).",
    },
    {
      title: "2. Strategic Dilemma Decisions",
      icon: Target,
      color: "#FFD778",
      text: "Each gate presents realistic student dilemmas—time management, ethical conflicts, academic pressure, emotional balance, and leadership. Choose the wisest course of action guided by ancient Dharma.",
    },
    {
      title: "3. Countdown Timers & Speed Bonus",
      icon: Clock,
      color: "#E68A24",
      text: "Every gate has a strict countdown timer (from 30s in Level 1 down to 10s in the intense Chakravyuha). Quick discernment awards valuable speed bonuses alongside base wisdom points.",
    },
    {
      title: "4. The Sacred Prana (3 Lives)",
      icon: Heart,
      color: "#E8A5B6",
      text: "You begin with 3 sacred lives symbolized by glowing lotuses. A hasty misstep or letting the timer expire costs 1 life. Read feedback carefully to grasp the ethical virtue at play.",
    },
    {
      title: "5. Krishna's Blessing (Extra Life)",
      icon: Feather,
      color: "#7EDCEB",
      text: "If your lives fall to zero, Lord Krishna offers divine grace: answer 3 Mahabharata trivia questions correctly to receive 1 restored life and resume your sacred journey (available once per level).",
    },
    {
      title: "6. Interactive Formation Map",
      icon: Navigation,
      color: "#D6A64B",
      text: "Navigate dynamic top-down battlefield diagrams. Tap active glowing gateways, overcome obstacles, and open the exit gateway to unlock the next level.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-radial-temple p-4 sm:p-8 z-10 select-none flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D6A64B]/40 bg-[#10102D]/80 text-[#FFD778] hover:border-[#FFD778] hover:bg-[#FFD778]/10 transition-all font-cinzel text-xs sm:text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Menu</span>
        </button>

        <div className="text-right">
          <div className="text-xs font-sanskrit text-[#7EDCEB]">क्रीडा नियमम्</div>
          <div className="text-sm font-cinzel text-[#FFD778] font-bold">How to Play Vyuha</div>
        </div>
      </div>

      {/* Guide Cards Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#10102D]/90 border border-[#D6A64B]/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-divine-glow"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient mb-2">
            The Rules of the Sacred Formations
          </h3>
          <p className="text-xs sm:text-sm text-[#FFD778]/80 font-cinzel italic">
            "Weapons break bone, but wisdom pierces destiny itself."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30 flex flex-col gap-2 hover:border-[#FFD778] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: 'rgba(16, 16, 45, 0.9)', color: st.color, border: `1px solid ${st.color}` }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-cinzel font-bold text-sm text-[#FFF1D0]">
                    {st.title}
                  </h4>
                </div>
                <p className="text-xs text-[#FFF1D0]/85 font-sans leading-relaxed">
                  {st.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              soundEngine.playConch();
              onStartPlaying();
            }}
            className="px-10 py-3.5 rounded-full font-cinzel font-bold text-sm tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#08091A]" />
            <span>Begin the Challenge</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
