import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Volume2, VolumeX, Sparkles, Eye, RotateCcw, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function SettingsModal({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleMute = () => {
    soundEngine.playClick();
    onUpdateSettings({ isMuted: !settings.isMuted });
  };

  const handleSoundVolume = (e) => {
    const val = parseFloat(e.target.value);
    onUpdateSettings({ soundVolume: val });
  };

  const handleMusicVolume = (e) => {
    const val = parseFloat(e.target.value);
    onUpdateSettings({ musicVolume: val });
  };

  const handleDensity = (density) => {
    soundEngine.playClick();
    onUpdateSettings({ particleDensity: density });
  };

  const handleToggleReducedMotion = () => {
    soundEngine.playClick();
    onUpdateSettings({ reducedMotion: !settings.reducedMotion });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="relative w-full max-w-md bg-[#10102D] border-2 border-[#D6A64B] rounded-2xl p-6 shadow-divine-glow-lg text-[#FFF1D0]"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#FFD778] hover:bg-[#FFD778]/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6 text-center">
          <div className="text-xs font-sanskrit text-[#7EDCEB] tracking-wider uppercase mb-0.5">
            व्यवस्थापनम्
          </div>
          <h3 className="text-xl font-cinzel font-bold text-gold-gradient">
            Settings & Sanctuary
          </h3>
        </div>

        {/* Settings Options */}
        <div className="space-y-5 text-xs sm:text-sm">
          {/* Master Sound Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30">
            <div className="flex items-center gap-2.5">
              {settings.isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-[#7EDCEB]" />}
              <div>
                <div className="font-cinzel font-semibold text-[#FFF1D0]">Master Audio</div>
                <div className="text-[11px] text-[#D6A64B]/80 font-sans">Toggle all chimes & conch</div>
              </div>
            </div>
            <button
              onClick={handleToggleMute}
              className={`px-3 py-1.5 rounded-full font-cinzel text-xs font-bold transition-all ${
                settings.isMuted
                  ? 'bg-red-950 text-red-300 border border-red-500'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-500'
              }`}
            >
              {settings.isMuted ? 'Muted' : 'Enabled'}
            </button>
          </div>

          {/* Sound FX Volume */}
          <div className="p-3 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30 space-y-2">
            <div className="flex justify-between font-cinzel text-xs">
              <span className="text-[#FFF1D0]">Sacred Chimes & Effects</span>
              <span className="text-[#FFD778]">{Math.round(settings.soundVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.soundVolume}
              onChange={handleSoundVolume}
              disabled={settings.isMuted}
              className="w-full accent-[#FFD778] cursor-pointer"
            />
          </div>

          {/* Music Volume */}
          <div className="p-3 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30 space-y-2">
            <div className="flex justify-between font-cinzel text-xs">
              <span className="text-[#FFF1D0]">Ambient Tanpura Drone</span>
              <span className="text-[#FFD778]">{Math.round(settings.musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.musicVolume}
              onChange={handleMusicVolume}
              disabled={settings.isMuted}
              className="w-full accent-[#FFD778] cursor-pointer"
            />
          </div>

          {/* Particle Density */}
          <div className="p-3 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30">
            <div className="flex items-center gap-2 mb-2 font-cinzel text-xs">
              <Sparkles className="w-4 h-4 text-[#FFD778]" />
              <span>Golden Particle Embers</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((dens) => (
                <button
                  key={dens}
                  onClick={() => handleDensity(dens)}
                  className={`py-1.5 rounded-lg font-cinzel text-xs uppercase tracking-wider border transition-all ${
                    settings.particleDensity === dens
                      ? 'bg-[#FFD778] text-[#08091A] font-bold border-[#FFF1D0]'
                      : 'bg-[#10102D] text-[#FFF1D0]/70 border-[#D6A64B]/30 hover:border-[#FFD778]'
                  }`}
                >
                  {dens}
                </button>
              ))}
            </div>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#071A3A]/70 border border-[#D6A64B]/30">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5 text-[#7EDCEB]" />
              <div>
                <div className="font-cinzel font-semibold text-[#FFF1D0]">Reduced Motion</div>
                <div className="text-[11px] text-[#D6A64B]/80 font-sans">Lower animations for comfort</div>
              </div>
            </div>
            <button
              onClick={handleToggleReducedMotion}
              className={`px-3 py-1.5 rounded-full font-cinzel text-xs font-bold transition-all ${
                settings.reducedMotion
                  ? 'bg-[#FFD778] text-[#08091A]'
                  : 'bg-[#10102D] text-[#FFF1D0]/60 border border-[#D6A64B]/40'
              }`}
            >
              {settings.reducedMotion ? 'Active' : 'Off'}
            </button>
          </div>

          {/* Reset Journey Progress */}
          <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/40">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full text-center text-xs font-cinzel text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Saved Journey Progress</span>
              </button>
            ) : (
              <div className="text-center space-y-2">
                <span className="text-xs text-red-300 font-sans block">
                  Confirm reset? All completed vyuhas and scores will be cleared.
                </span>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      onResetProgress();
                      setShowResetConfirm(false);
                      onClose();
                    }}
                    className="px-3 py-1 rounded bg-red-600 text-white font-cinzel text-xs font-bold hover:bg-red-700"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1 rounded bg-[#071A3A] text-[#FFF1D0] font-cinzel text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
