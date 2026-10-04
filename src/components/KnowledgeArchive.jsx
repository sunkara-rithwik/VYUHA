import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Shield, Sparkles, Feather, Compass, Award } from 'lucide-react';
import { MAHABHARATA_LORE } from '../data/mahabharataLore';
import { soundEngine } from '../utils/soundEngine';

export default function KnowledgeArchive({ onBack }) {
  const [activeTab, setActiveTab] = useState('internal'); // 'internal' | 'virtues' | 'warriors' | 'astras'

  const tabs = [
    { id: 'internal', label: 'Internal Kurukshetra', icon: Compass },
    { id: 'virtues', label: 'Sacred Virtues', icon: Sparkles },
    { id: 'warriors', label: 'Key Figures & Gurus', icon: Award },
    { id: 'astras', label: 'Celestial Astras', icon: Shield },
  ];

  return (
    <div className="relative w-full min-h-screen bg-radial-temple p-4 sm:p-8 z-10 select-none flex flex-col items-center">
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6">
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
          <div className="text-xs font-sanskrit text-[#7EDCEB]">महाभारत ज्ञानकोशः</div>
          <div className="text-sm font-cinzel text-[#FFD778] font-bold">Mahabharata Knowledge Archive</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full max-w-5xl flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-cinzel transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-[#D6A64B] to-[#FFD778] text-[#08091A] border-[#FFF1D0] font-bold shadow-divine-glow'
                  : 'bg-[#10102D]/80 text-[#FFF1D0]/80 border-[#D6A64B]/30 hover:border-[#FFD778]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="w-full max-w-5xl">
        {/* Tab 1: Internal Kurukshetra */}
        {activeTab === 'internal' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#10102D]/90 border border-[#D6A64B]/50 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-divine-glow space-y-6"
          >
            <div>
              <span className="text-xs font-sanskrit text-[#7EDCEB] tracking-wider uppercase block mb-1">
                {MAHABHARATA_LORE.internalBattlefield.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient">
                {MAHABHARATA_LORE.internalBattlefield.title}
              </h3>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#071A3A]/80 border border-[#D6A64B]/40 leading-relaxed font-sans text-sm sm:text-base text-[#FFF1D0]">
              {MAHABHARATA_LORE.internalBattlefield.concept}
            </div>

            <div className="p-4 rounded-xl bg-[#080a1c] border border-[#FFD778]/40 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#FFD778] shrink-0 mt-0.5" />
              <div>
                <span className="font-cinzel text-xs uppercase tracking-wider text-[#FFD778] font-bold block mb-1">
                  Living Application for Modern Minds
                </span>
                <p className="text-xs sm:text-sm text-[#FFF1D0]/90 font-sans leading-relaxed">
                  {MAHABHARATA_LORE.internalBattlefield.keyTakeaway}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Sacred Virtues */}
        {activeTab === 'virtues' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {MAHABHARATA_LORE.virtues.map((v, idx) => (
              <div
                key={idx}
                className="bg-[#10102D]/90 border border-[#D6A64B]/40 rounded-xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-[#FFD778] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-cinzel font-bold text-base text-[#FFD778]">{v.name}</h4>
                    <span className="text-xs font-sanskrit text-[#7EDCEB] px-2 py-0.5 rounded bg-[#071A3A] border border-[#7EDCEB]/30">
                      {v.sanskrit}
                    </span>
                  </div>
                  <p className="text-xs text-[#FFF1D0]/80 font-sans mb-3 leading-relaxed">
                    {v.meaning}
                  </p>
                </div>
                <div className="p-2.5 rounded bg-[#071A3A]/70 border border-[#D6A64B]/20 text-[11px] text-[#D6A64B] font-sans">
                  <span className="font-bold font-cinzel block text-[#FFD778] mb-0.5">Student Practice:</span>
                  {v.application}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 3: Warriors & Gurus */}
        {activeTab === 'warriors' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {MAHABHARATA_LORE.warriors.map((w, idx) => (
              <div
                key={idx}
                className="bg-[#10102D]/90 border border-[#D6A64B]/40 rounded-xl p-5 backdrop-blur-xl hover:border-[#FFD778] transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-cinzel font-bold text-base text-gold-gradient">{w.name}</h4>
                  <span className="text-[11px] font-sans text-[#7EDCEB]">{w.role}</span>
                </div>
                <div className="text-xs font-cinzel text-[#FFD778] mb-2">
                  Key Virtue: <span className="text-[#FFF1D0]">{w.virtue}</span>
                </div>
                <div className="p-3 rounded-lg bg-[#071A3A]/70 border border-[#D6A64B]/30 text-xs text-[#FFF1D0]/90 font-sans leading-relaxed">
                  <span className="font-bold text-[#D6A64B] block mb-0.5">Timeless Lesson:</span>
                  {w.lesson}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 4: Celestial Astras */}
        {activeTab === 'astras' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {MAHABHARATA_LORE.celestialAstras.map((a, idx) => (
              <div
                key={idx}
                className="bg-[#10102D]/90 border border-[#D6A64B]/40 rounded-xl p-5 backdrop-blur-xl hover:border-[#FFD778] transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-cinzel font-bold text-base text-[#FFD778]">{a.name}</h4>
                  <span className="text-[11px] font-cinzel text-[#E68A24]">{a.presidingDeity}</span>
                </div>
                <div className="text-xs text-[#7EDCEB] font-sans italic mb-2">
                  {a.nature}
                </div>
                <p className="text-xs text-[#FFF1D0]/90 font-sans leading-relaxed">
                  {a.significance}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
