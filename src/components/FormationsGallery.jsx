import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Sparkles, BookOpen, ChevronRight, Play } from 'lucide-react';
import { FORMATIONS_LORE } from '../data/formationsLore';
import { soundEngine } from '../utils/soundEngine';

export default function FormationsGallery({ onBack, onPlayFormation }) {
  const [selectedFormationId, setSelectedFormationId] = useState(1);
  const current = FORMATIONS_LORE.find((f) => f.id === selectedFormationId) || FORMATIONS_LORE[0];

  return (
    <div className="relative w-full min-h-screen bg-radial-temple p-4 sm:p-8 z-10 select-none flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6">
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
          <div className="text-xs font-sanskrit text-[#7EDCEB]">पञ्च महाव्यूहाः</div>
          <div className="text-sm font-cinzel text-[#FFD778] font-bold">The Five Sacred Formations</div>
        </div>
      </div>

      {/* Main Content Layout: Formation Selector Tabs + Detailed Showcase */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Left Column: Vertical Formation Selector */}
        <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {FORMATIONS_LORE.map((form) => {
            const isSelected = form.id === selectedFormationId;
            return (
              <button
                key={form.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedFormationId(form.id);
                }}
                className={`flex-shrink-0 text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#10102D] border-[#FFD778] shadow-divine-glow text-[#FFF1D0]'
                    : 'bg-[#071A3A]/60 border-[#D6A64B]/30 hover:border-[#D6A64B] text-[#FFF1D0]/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel font-bold text-xs shrink-0"
                    style={{
                      background: isSelected ? 'rgba(255, 215, 120, 0.2)' : 'rgba(7, 26, 58, 0.8)',
                      color: form.accentColor,
                      border: `1px solid ${form.accentColor}`,
                    }}
                  >
                    {form.id}
                  </div>
                  <div>
                    <div className="font-cinzel font-bold text-xs sm:text-sm">{form.name}</div>
                    <div className="text-[10px] text-[#D6A64B] font-sanskrit">{form.sanskrit}</div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform hidden sm:block ${
                    isSelected ? 'text-[#FFD778] translate-x-1' : 'text-[#D6A64B]/40'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Formation Dossier */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full lg:w-2/3 bg-[#10102D]/90 border-2 border-[#D6A64B]/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-divine-glow-lg flex flex-col justify-between"
        >
          <div>
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6A64B]/30 pb-4 mb-4">
              <div>
                <span className="text-xs font-sanskrit text-[#7EDCEB] tracking-wider block">
                  {current.sanskrit} • {current.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient">
                  {current.name}
                </h3>
              </div>

              <div className="px-3 py-1 rounded bg-[#071A3A] border border-[#FFD778]/40 text-xs font-cinzel text-[#FFD778]">
                {current.deploymentDay}
              </div>
            </div>

            {/* Quote */}
            <div className="p-3.5 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30 mb-5">
              <p className="text-xs sm:text-sm italic text-[#FFD778] font-cinzel">
                "{current.quote}"
              </p>
            </div>

            {/* Tactical Concept */}
            <div className="mb-5">
              <h4 className="text-xs font-cinzel uppercase tracking-wider text-[#7EDCEB] font-bold mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Tactical Military Concept</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF1D0]/90 leading-relaxed font-sans">
                {current.tacticalConcept}
              </p>
            </div>

            {/* Life & Student Philosophy */}
            <div className="mb-5 p-4 rounded-xl bg-[#080a1c]/80 border border-[#D6A64B]/40">
              <h4 className="text-xs font-cinzel uppercase tracking-wider text-[#FFD778] font-bold mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E68A24]" />
                <span>Life & Student Parallel</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF1D0] leading-relaxed font-sans">
                {current.lifePhilosophy}
              </p>
            </div>

            {/* Key Strengths */}
            <div className="mb-6">
              <h4 className="text-xs font-cinzel uppercase tracking-wider text-[#D6A64B] font-bold mb-2">
                Key Formation Strengths
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#FFF1D0]/80">
                {current.keyStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-[#071A3A]/40 p-2 rounded border border-[#D6A64B]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD778] mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action to launch this formation directly */}
          <div className="flex justify-end pt-4 border-t border-[#D6A64B]/30">
            <button
              onClick={() => {
                soundEngine.playConch();
                onPlayFormation(current.id - 1);
              }}
              className="px-6 py-2.5 rounded-full font-cinzel font-bold text-xs sm:text-sm tracking-wider text-[#08091A] bg-gradient-to-r from-[#FFD778] to-[#E68A24] shadow-divine-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Enter {current.name}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
