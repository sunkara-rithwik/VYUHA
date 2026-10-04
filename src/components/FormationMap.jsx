import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight, Sparkles, Navigation, Target } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function FormationMap({
  level,
  currentNodeIndex,
  onSelectNode,
}) {
  const totalNodes = level.questionCount;

  // Generate node coordinates dynamically for each formation type
  const getNodeCoordinates = (levelKey) => {
    switch (levelKey) {
      case 'ardhachandra': {
        // Crescent Moon Arc: 5 nodes along an arched crescent (semi-circle)
        // Center (400, 320), Radius 200, Angles from 200 deg to 340 deg
        return [
          { x: 180, y: 320, label: 'Horn of Discipline' },
          { x: 260, y: 190, label: 'Waxing Pathway' },
          { x: 400, y: 130, label: 'Zenith of Moderation' },
          { x: 540, y: 190, label: 'Waning Balance' },
          { x: 620, y: 320, label: 'Gateway of Harmony' },
        ];
      }
      case 'garuda': {
        // Eagle: 6 nodes: Beak vanguard, Left Wing, Right Wing, Heart, Left Flank, Tail Gate
        return [
          { x: 400, y: 90, label: 'Beak Vanguard' },
          { x: 260, y: 180, label: 'Left Feather Wing' },
          { x: 540, y: 180, label: 'Right Feather Wing' },
          { x: 400, y: 240, label: 'Heart of Fellowship' },
          { x: 300, y: 340, label: 'Coordinated Flank' },
          { x: 400, y: 430, label: 'Crown of Victory' },
        ];
      }
      case 'suchimukha': {
        // Needle: 7 nodes in a narrow concentrated vertical corridor
        return [
          { x: 400, y: 460, label: 'Needle Eye Entry' },
          { x: 400, y: 400, label: 'First Filter' },
          { x: 400, y: 340, label: 'Corridor of Silence' },
          { x: 400, y: 280, label: 'The Needle Shaft' },
          { x: 400, y: 220, label: 'Zero Distraction' },
          { x: 400, y: 160, label: 'Diamond Point' },
          { x: 400, y: 90, label: 'Needle Tip Breach' },
        ];
      }
      case 'padma': {
        // Layered Lotus: 8 nodes circling from outer petals into inner sanctum
        const center = { x: 400, y: 270 };
        const radius = 175;
        const nodes = [];
        for (let i = 0; i < 7; i++) {
          const angle = (i * (2 * Math.PI / 7)) - (Math.PI / 2);
          nodes.push({
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle),
            label: `Petal Layer ${i + 1}`,
          });
        }
        // Center heart node
        nodes.push({ x: 400, y: 270, label: 'Inner Golden Sanctum' });
        return nodes;
      }
      case 'chakra': {
        // Chakravyuha: 10 nodes navigating through 7 concentric rings inward
        return [
          { x: 400, y: 510, label: 'Ring 1: Outer Wall' },
          { x: 220, y: 450, label: 'Ring 2: Chariot Line' },
          { x: 160, y: 280, label: 'Ring 3: Wall of Spears' },
          { x: 260, y: 160, label: 'Ring 4: Shifting Maze' },
          { x: 400, y: 130, label: 'Ring 5: Gate of Phantoms' },
          { x: 550, y: 190, label: 'Ring 6: Ring of Fire' },
          { x: 620, y: 320, label: 'Ring 7: Chamber of Echoes' },
          { x: 500, y: 400, label: 'Ring 8: The Narrow Breach' },
          { x: 330, y: 340, label: 'Ring 9: Inner Sanctum' },
          { x: 400, y: 270, label: 'The Center of Destiny' },
        ];
      }
      default:
        return [];
    }
  };

  const nodeCoords = getNodeCoordinates(level.key);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center p-3 sm:p-6 z-10 select-none">
      {/* Formation Title & Current Mission Banner */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 p-4 rounded-xl bg-[#10102D]/80 border border-[#D6A64B]/40 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#071A3A] border border-[#FFD778] flex items-center justify-center text-xl shadow-divine-glow">
            {level.symbol}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold-gradient">
                {level.name}
              </h3>
              <span className="text-xs font-sanskrit text-[#7EDCEB] px-1.5 py-0.5 rounded bg-[#071A3A] border border-[#7EDCEB]/30">
                {level.sanskrit}
              </span>
            </div>
            <p className="text-xs text-[#FFF1D0]/80 font-sans">
              Tactical Objective: Reach and breach Gate {currentNodeIndex + 1} of {totalNodes}
            </p>
          </div>
        </div>

        {/* Action Prompt */}
        <div className="flex items-center gap-2">
          <div className="text-right hidden md:block">
            <span className="text-[10px] uppercase font-cinzel text-[#FFD778] block">Current Path</span>
            <span className="text-xs font-cinzel text-[#FFF1D0]">
              {nodeCoords[currentNodeIndex]?.label || 'Active Gateway'}
            </span>
          </div>
          <button
            onClick={() => onSelectNode(currentNodeIndex)}
            className="px-4 py-2 rounded-full font-cinzel text-xs font-bold bg-gradient-to-r from-[#FFD778] to-[#E68A24] text-[#08091A] shadow-divine-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Face Challenge</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Interactive Formation Battlefield Map */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[580px] rounded-2xl bg-[#080a1c] border-2 border-[#D6A64B]/50 shadow-divine-glow-lg overflow-hidden flex items-center justify-center p-2">
        {/* Subtle grid and battlefield topography in background */}
        <div className="absolute inset-0 bg-radial-divine opacity-50 pointer-events-none" />

        <svg viewBox="0 0 800 550" className="w-full h-full object-contain">
          {/* Defs for gradients & glowing filters */}
          <defs>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="pathActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD778" />
              <stop offset="100%" stopColor="#E68A24" />
            </linearGradient>
            <linearGradient id="pathLockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#071A3A" />
              <stop offset="100%" stopColor="#10102D" />
            </linearGradient>
          </defs>

          {/* --- 1. Formation-Specific Background Art & Pathways --- */}

          {/* LEVEL 1: ARDHACHANDRAVYUHA (Crescent) */}
          {level.key === 'ardhachandra' && (
            <g className="crescent-formation">
              {/* Crescent background aura */}
              <path
                d="M 160 340 A 240 240 0 0 1 640 340 A 180 180 0 0 0 160 340 Z"
                fill="rgba(126, 220, 235, 0.08)"
                stroke="#7EDCEB"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Arching connecting pathway line */}
              <path
                d="M 180 320 Q 400 60 620 320"
                fill="none"
                stroke="#7EDCEB"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </g>
          )}

          {/* LEVEL 2: GARUDAVYUHA (Eagle) */}
          {level.key === 'garuda' && (
            <g className="garuda-formation">
              {/* Eagle Silhouette & Feather Lines */}
              <g opacity="0.3" stroke="#FFD778" fill="none" strokeWidth="1.5">
                {/* Left Wing Feathers */}
                <path d="M 400 240 C 200 200 80 150 120 280 C 180 320 280 280 400 240" />
                <path d="M 400 240 C 160 140 60 80 100 200" strokeDasharray="3 3" />
                {/* Right Wing Feathers */}
                <path d="M 400 240 C 600 200 720 150 680 280 C 620 320 520 280 400 240" />
                <path d="M 400 240 C 640 140 740 80 700 200" strokeDasharray="3 3" />
                {/* Beak & Head */}
                <polygon points="400,60 385,110 415,110" fill="rgba(255, 215, 120, 0.15)" />
                {/* Tail fan */}
                <path d="M 370 380 L 330 480 L 400 450 L 470 480 L 430 380 Z" fill="rgba(230, 138, 36, 0.1)" />
              </g>
              {/* Connecting Pathway Lines */}
              <polyline
                points="400,90 260,180 400,240 540,180 400,240 300,340 400,430"
                fill="none"
                stroke="#FFD778"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
            </g>
          )}

          {/* LEVEL 3: SUCHIMUKHAVYUHA (Needle Point Corridor) */}
          {level.key === 'suchimukha' && (
            <g className="suchimukha-formation">
              {/* Flanking defensive lines narrowing down like a needle */}
              <polygon
                points="100,520 370,80 400,60 430,80 700,520 620,520 400,120 180,520"
                fill="rgba(230, 138, 36, 0.08)"
                stroke="#E68A24"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              {/* Needle Central Energy Beam */}
              <line
                x1="400"
                y1="520"
                x2="400"
                y2="70"
                stroke="#FFD778"
                strokeWidth="4"
                strokeDasharray="10 5"
              />
              {/* Golden Lotus at the tip of the needle */}
              <circle cx="400" cy="70" r="16" fill="rgba(255,215,120,0.3)" stroke="#FFD778" strokeWidth="2" />
            </g>
          )}

          {/* LEVEL 4: PADMAVYUHA (Layered Blooming Lotus) */}
          {level.key === 'padma' && (
            <g className="padma-formation">
              {/* Rotating outer lotus petals */}
              <g transform="translate(400, 270)" className="animate-spin-slow">
                {Array.from({ length: 8 }).map((_, i) => (
                  <path
                    key={`petal-${i}`}
                    d="M 0 -195 C 40 -150 40 -90 0 0 C -40 -90 -40 -150 0 -195 Z"
                    transform={`rotate(${i * 45})`}
                    fill="rgba(232, 165, 182, 0.12)"
                    stroke="#E8A5B6"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
              {/* Inner ring */}
              <circle cx="400" cy="270" r="85" fill="none" stroke="#FFD778" strokeWidth="2" strokeDasharray="4 4" />
            </g>
          )}

          {/* LEVEL 5: CHAKRAVYUHA (Rotating Concentric Rings) */}
          {level.key === 'chakra' && (
            <g className="chakra-formation">
              {/* 7 Concentric Rings with alternating rotations */}
              {[240, 205, 170, 135, 100, 65, 30].map((radius, idx) => (
                <g key={`ring-${idx}`}>
                  <circle
                    cx="400"
                    cy="270"
                    r={radius}
                    fill="none"
                    stroke={idx % 2 === 0 ? "#D6A64B" : "#FFD778"}
                    strokeWidth={idx === 6 ? 2.5 : 1.5}
                    strokeDasharray={idx % 2 === 0 ? "12 8" : "6 6"}
                    opacity={0.5 + idx * 0.07}
                  />
                </g>
              ))}
              {/* Center Core Gateway */}
              <circle cx="400" cy="270" r="22" fill="#E68A24" opacity="0.4" />
              <polygon points="400,252 414,278 386,278" fill="#FFD778" />
            </g>
          )}

          {/* Connecting Pathway Segments between Consecutive Nodes */}
          {nodeCoords.map((coord, index) => {
            if (index === 0) return null;
            const prev = nodeCoords[index - 1];
            const isCompleted = index <= currentNodeIndex;
            return (
              <line
                key={`line-${index}`}
                x1={prev.x}
                y1={prev.y}
                x2={coord.x}
                y2={coord.y}
                stroke={isCompleted ? "#FFD778" : "rgba(214, 166, 75, 0.25)"}
                strokeWidth={isCompleted ? "3.5" : "2"}
                strokeDasharray={isCompleted ? "none" : "5 5"}
                filter={isCompleted ? "url(#goldGlow)" : "none"}
              />
            );
          })}

          {/* Interactive Gateway Nodes */}
          {nodeCoords.map((coord, index) => {
            const isCompleted = index < currentNodeIndex;
            const isCurrent = index === currentNodeIndex;
            const isLocked = index > currentNodeIndex;

            return (
              <g
                key={`node-${index}`}
                className={`cursor-pointer transition-all ${
                  isCurrent ? 'filter drop-shadow-[0_0_12px_rgba(255,215,120,0.9)]' : ''
                }`}
                onClick={() => {
                  if (isCurrent) {
                    onSelectNode(index);
                  } else if (isCompleted) {
                    // Allowed to review or revisit
                    onSelectNode(index);
                  } else {
                    soundEngine.playIncorrect();
                  }
                }}
              >
                {/* Outer Ring Pulse for Current Node */}
                {isCurrent && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="28"
                    fill="none"
                    stroke="#FFD778"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    className="animate-spin-slow opacity-80"
                  />
                )}

                {/* Base Node Circle */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="20"
                  fill={isCompleted ? "#071A3A" : isCurrent ? "#10102D" : "#050614"}
                  stroke={isCompleted ? "#7EDCEB" : isCurrent ? "#FFD778" : "rgba(214, 166, 75, 0.4)"}
                  strokeWidth={isCurrent ? "3" : "2"}
                />

                {/* Inner Icon / Status */}
                {isCompleted && (
                  <g transform={`translate(${coord.x - 7}, ${coord.y - 7})`}>
                    <polyline
                      points="2,7 6,11 13,3"
                      fill="none"
                      stroke="#7EDCEB"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {isCurrent && (
                  <g transform={`translate(${coord.x - 6}, ${coord.y - 6})`}>
                    {/* Lotus Center Petal */}
                    <circle cx="6" cy="6" r="4.5" fill="#FFD778" />
                  </g>
                )}

                {isLocked && (
                  <g transform={`translate(${coord.x - 6}, ${coord.y - 6})`} opacity="0.4">
                    <rect x="2" y="5" width="8" height="6" rx="1" fill="#D6A64B" />
                    <path d="M4,5 V3 A2,2 0 0,1 8,3 V5" fill="none" stroke="#D6A64B" strokeWidth="1.2" />
                  </g>
                )}

                {/* Node Number Label */}
                <text
                  x={coord.x}
                  y={coord.y + 34}
                  textAnchor="middle"
                  fill={isCurrent ? "#FFD778" : isCompleted ? "#7EDCEB" : "rgba(255,241,208,0.5)"}
                  fontSize="11"
                  fontFamily="Cinzel"
                  fontWeight={isCurrent ? "bold" : "normal"}
                  letterSpacing="0.05em"
                >
                  Gate {index + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend / Status Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-cinzel bg-[#10102D]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D6A64B]/30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#7EDCEB]">
              <span className="w-2 h-2 rounded-full bg-[#7EDCEB]" /> Conquered
            </span>
            <span className="flex items-center gap-1 text-[#FFD778]">
              <span className="w-2 h-2 rounded-full bg-[#FFD778] animate-ping" /> Active Gate
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-600" /> Locked Ahead
            </span>
          </div>
          <span className="text-[#D6A64B]/80 hidden sm:inline">
            Tap the glowing active gate to advance
          </span>
        </div>
      </div>
    </div>
  );
}
