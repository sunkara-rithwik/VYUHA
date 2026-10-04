import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function CinematicIntro({ onComplete, isMuted, onToggleMute }) {
  const [phase, setPhase] = useState(0); 
  // 0: Darkness & subtle particles (0-2s)
  // 1: Mandala emergence & Celestial Light (2-5s)
  // 2: Title Reveal "VYUHA - THE PATH OF WISDOM" (5-8s)
  // 3: Kurukshetra Battlefield Silhouette & Divine Message (8s+)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1800);
    const timer2 = setTimeout(() => {
      setPhase(2);
      soundEngine.playTempleBell(1);
    }, 4500);
    const timer3 = setTimeout(() => {
      setPhase(3);
      soundEngine.playConch();
    }, 7800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleStart = () => {
    soundEngine.playConch();
    onComplete();
  };

  const handleSkip = () => {
    soundEngine.playClick();
    onComplete();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050614] flex flex-col items-center justify-center select-none">
      {/* Top Controls: Sound & Skip */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
        <button
          onClick={onToggleMute}
          className="p-2 rounded-full border border-[#D6A64B]/40 bg-[#10102D]/70 text-[#FFD778] hover:bg-[#FFD778]/15 hover:border-[#FFD778] transition-all backdrop-blur-sm"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full border border-[#D6A64B]/40 bg-[#10102D]/70 text-[#FFF1D0] font-cinzel text-xs tracking-wider hover:border-[#FFD778] hover:text-[#FFD778] transition-all backdrop-blur-sm"
        >
          Skip Intro
        </button>
      </div>

      {/* Layer 1: Celestial Sky & Golden Dawn Background (Phase 3) */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 3.5, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(ellipse at 50% 65%, rgba(230, 138, 36, 0.45) 0%, rgba(16, 16, 45, 0.8) 50%, rgba(5, 6, 20, 1) 90%)"
        }}
      />

      {/* Layer 2: Kurukshetra Battlefield Silhouette (Distant Chariots, Flags, Ancient War Spires) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: phase >= 3 ? 0.75 : 0, y: phase >= 3 ? 0 : 50 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full object-cover fill-[#070b18]">
          {/* Distant Hills and Battlefield horizon */}
          <path d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,181.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          
          {/* Silhouettes of Chariots, Banners, and Spears */}
          {/* Chariot 1 Left */}
          <g transform="translate(180, 150) scale(0.65)" fill="#060914">
            <circle cx="40" cy="50" r="18" fill="none" stroke="#080d1e" strokeWidth="4" />
            <path d="M20,30 L60,30 L50,50 L10,50 Z" />
            <line x1="35" y1="30" x2="35" y2="5" stroke="#080d1e" strokeWidth="2.5" />
            <polygon points="35,5 55,10 35,18" fill="#D6A64B" opacity="0.6" />
          </g>
          {/* Center Chariot (Arjuna & Krishna) */}
          <g transform="translate(680, 125) scale(0.9)" fill="#050711">
            <circle cx="50" cy="65" r="22" fill="none" stroke="#D6A64B" strokeWidth="2" opacity="0.7" />
            <path d="M25,40 L75,40 L65,65 L15,65 Z" />
            {/* Chariot Canopy / Ratha dome */}
            <path d="M30,38 Q50,15 70,38 Z" fill="#080d1e" />
            {/* Hanuman Dhwaja Flagpole */}
            <line x1="50" y1="20" x2="50" y2="-25" stroke="#FFD778" strokeWidth="3" />
            <polygon points="50,-25 85,-15 50,-5" fill="#E68A24" opacity="0.8" />
            {/* Figure silhouettes */}
            <circle cx="42" cy="30" r="4.5" fill="#7EDCEB" opacity="0.9" /> {/* Krishna */}
            <circle cx="58" cy="28" r="5" fill="#FFD778" opacity="0.9" /> {/* Arjuna with bow */}
            <line x1="62" y1="22" x2="72" y2="35" stroke="#FFD778" strokeWidth="2" />
          </g>
          {/* War banners right */}
          <g transform="translate(1120, 140) scale(0.7)" fill="#060914">
            <line x1="50" y1="80" x2="50" y2="10" stroke="#080d1e" strokeWidth="3" />
            <polygon points="50,10 80,18 50,28" fill="#D6A64B" opacity="0.5" />
            <line x1="75" y1="80" x2="75" y2="20" stroke="#080d1e" strokeWidth="2.5" />
            <polygon points="75,20 100,28 75,36" fill="#E68A24" opacity="0.5" />
          </g>
        </svg>
      </motion.div>

      {/* Layer 3: Central Glowing Sacred Mandala (Forming from phase 1) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.2, rotate: -120 }}
          animate={{
            opacity: phase >= 1 ? (phase >= 3 ? 0.35 : 0.8) : 0,
            scale: phase >= 1 ? 1 : 0.2,
            rotate: phase >= 1 ? 0 : -120,
          }}
          transition={{ duration: 3.5, ease: "easeOut" }}
          className="w-[320px] h-[320px] md:w-[580px] md:h-[580px] relative flex items-center justify-center"
        >
          {/* Golden Rotating Celestial Mandala SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#FFD778] animate-spin-slow">
            {/* Outer Ring */}
            <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.8" />
            
            {/* 12-petaled Sacred Geometry */}
            {Array.from({ length: 12 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                <path d="M100 16 C106 40 106 60 100 84 C94 60 94 40 100 16 Z" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.75" />
                <circle cx="100" cy="18" r="2.2" fill="#E68A24" />
                <circle cx="100" cy="40" r="1.5" fill="#FFD778" />
              </g>
            ))}

            {/* Inner Ring with 8-fold Chakra */}
            <circle cx="100" cy="100" r="48" fill="none" stroke="#E68A24" strokeWidth="1.5" opacity="0.9" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`spoke-${i}`}
                x1="100"
                y1="100"
                x2={100 + 48 * Math.cos((i * Math.PI) / 4)}
                y2={100 + 48 * Math.sin((i * Math.PI) / 4)}
                stroke="#FFD778"
                strokeWidth="1.2"
                opacity="0.8"
              />
            ))}
            <circle cx="100" cy="100" r="12" fill="#FFD778" opacity="0.8" />
            <circle cx="100" cy="100" r="5" fill="#08091A" />
          </svg>

          {/* Radial Divine Light Pulse */}
          <div className="absolute inset-0 rounded-full bg-radial-divine filter blur-2xl opacity-70 animate-pulse-subtle" />
        </motion.div>
      </div>

      {/* Layer 4: Cinematic Content: Title & Epigraph */}
      <div className="relative z-20 max-w-3xl px-6 text-center flex flex-col items-center">
        {/* Phase 2: Title Appears */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Sanskrit Subhead */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-xs md:text-sm font-sanskrit text-[#7EDCEB] tracking-widest uppercase mb-1 drop-shadow-[0_0_10px_rgba(126,220,235,0.7)]"
              >
                धर्मक्षेत्रे कुरुक्षेत्रे • ज्ञानमार्गः
              </motion.div>

              {/* Title VYUHA */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-cinzel font-black tracking-widest text-gold-gradient drop-shadow-[0_0_35px_rgba(255,215,120,0.6)]">
                VYUHA
              </h1>

              {/* Subtitle */}
              <div className="text-sm sm:text-lg md:text-xl font-cinzel font-semibold tracking-[0.3em] text-[#FFD778] mt-1 mb-3">
                THE PATH OF WISDOM
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="text-xs sm:text-sm md:text-base font-cinzel italic text-[#FFF1D0]/90 max-w-xl mb-6"
              >
                "Where strategy meets wisdom, and every decision shapes destiny."
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Sacred Message & Begin Button */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="flex flex-col items-center mt-2"
            >
              {/* Sacred Passage */}
              <div className="p-4 md:p-6 rounded-lg bg-[#071A3A]/70 border border-[#D6A64B]/40 backdrop-blur-md max-w-xl mb-8 shadow-2xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-[#10102D] border border-[#FFD778]/50 text-[10px] font-cinzel text-[#FFD778] tracking-widest uppercase">
                  Sacred Call to Action
                </div>
                <p className="text-xs sm:text-sm md:text-base text-[#FFF1D0] leading-relaxed font-sans font-light">
                  Enter the sacred formations of the Mahabharata. Face the challenges of life. Discover the wisdom hidden within every choice.
                </p>
              </div>

              {/* Ornate Glowing BEGIN YOUR JOURNEY Button */}
              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-8 py-3.5 md:px-12 md:py-4 rounded-full font-cinzel text-base md:text-lg font-bold tracking-widest text-[#08091A] bg-gradient-to-r from-[#FFD778] via-[#FFF1D0] to-[#D6A64B] shadow-divine-glow hover:shadow-divine-glow-lg transition-all overflow-hidden"
              >
                {/* Glowing shimmer ray inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#E68A24]" />
                  BEGIN YOUR JOURNEY
                  <ChevronRight className="w-5 h-5 text-[#08091A]" />
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Subtle Ambient Caption */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[11px] text-[#D6A64B]/50 font-cinzel tracking-wider pointer-events-none">
        An Epic Psychological & Philosophical Quest Inspired by Maharishi Vyasa's Mahabharata
      </div>
    </div>
  );
}
