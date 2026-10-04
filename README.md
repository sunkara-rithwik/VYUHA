# VYUHA – The Path of Wisdom
### A Divine, Highly Animated Mahabharata-Inspired Browser Game

> *"Where strategy meets wisdom, and every decision shapes destiny."*

---

## 🌟 Overview

**VYUHA – The Path of Wisdom** is a cinematic, mythology-inspired browser game that bridges the tactical military formations of the Kurukshetra War with real-world moral, academic, and psychological decisions faced in modern student life.

Built with **React**, **Vite**, **Framer Motion**, and a custom **Web Audio API procedural sound synthesizer**, the game creates an atmospheric mythological world featuring golden celestial particles, temple architecture, sacred mandalas, and five interactive military formations.

---

## 🏹 The Five Sacred Formations (Levels)

| Level | Formation | Sanskrit | Difficulty | Theme | Gates | Time / Gate |
|---|---|---|---|---|---|---|
| **1** | **Ardhachandravyuha** | अर्धचन्द्रव्यूह | Easy | Balance, discipline, and responsibility | 5 Gates | 30s |
| **2** | **Garudavyuha** | गरुडव्यूह | Moderate | Teamwork, leadership, and trust | 6 Gates | 25s |
| **3** | **Suchimukhavyuha** | सूचीमुखव्यूह | Hard | Focus, patience, and precision | 7 Gates | 20s |
| **4** | **Padmavyuha** | पद्मव्यूह | Very Hard | Complex decisions and ethical discernment | 8 Gates | 15s |
| **5** | **Chakravyuha** | चक्रव्यूह | Extreme | Survival, courage, and ultimate wisdom | 10 Gates | 10s |

---

## 🪶 Key Features & Mechanics

1. **Cinematic Opening Sequence**:
   - Multi-phase transition from cosmic darkness to a radiant glowing mandala and the Kurukshetra battlefield silhouette with chariots and banners.
   - Accompanied by conch horn blasts and temple chimes.

2. **Interactive Top-Down Formation Battlefield Maps**:
   - Custom SVG battlefields for all 5 vyuhas:
     - **Ardhachandra**: Glowing crescent pathways.
     - **Garuda**: Expanding wings, feather energy lines, and vanguard beak.
     - **Suchimukha**: Narrow needle corridor piercing through defense lines.
     - **Padma**: Layered blooming lotus petals rotating in concentric tiers.
     - **Chakravyuha**: Concentric rotating multi-ring labyrinth with shifting gates.

3. **Curated Dilemma Decision Engine**:
   - 36 rich student scenarios covering procrastination, high-pressure exams, group dynamics, academic integrity, burnout, mentorship, and ethical leadership.
   - Comprehensive philosophical feedback linked to the Bhagavad Gita and ancient virtues (*Samatvam*, *Dhriti*, *Nishkama Karma*, *Viveka*, *Satya*).

4. **Krishna's Blessing (Extra-Life System)**:
   - 3 sacred lives (*Prana*) symbolized by glowing golden lotuses.
   - When all lives are lost, the player can invoke **Krishna's Blessing**: answer 3 randomized Mahabharata trivia questions correctly from a 35+ question bank to restore 1 life and continue the quest.

5. **Procedural Web Audio API Synthesizer**:
   - 100% offline and asset-free audio synthesis:
     - **Shankha**: Realistic harmonic conch shell horn with expressive filter sweep.
     - **Ghanta**: Metallic temple bell chime with exponential decay.
     - **Bansuri**: Krishna's lyrical flute motif.
     - **Tanpura Drone**: Dual-oscillator meditative ambient drone.
     - **Dundubhi**: Deep war drum impact.
     - **Chime Arpeggio**: Pentatonic victory flourish for correct choices.

6. **Knowledge Archive & Formations Gallery**:
   - Deep dive into historical tactics, deployment days, architects (Arjuna, Bhishma, Drona), and student parallels.
   - Full philosophical archive exploring the internal Kurukshetra of the human mind, the virtues, and celestial Astras.

7. **Settings & Accessibility**:
   - Volume sliders for SFX and Music.
   - Master mute toggle.
   - Golden particle density controls (*Low*, *Medium*, *High*).
   - Reduced Motion accessibility toggle.
   - LocalStorage game save persistence and reset option.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Launch

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🏛️ Project Structure

```text
├── src/
│   ├── components/
│   │   ├── AnswerFeedback.jsx       # Decision feedback & virtue analysis
│   │   ├── CelestialCanvas.jsx      # Ambient floating golden particles & embers
│   │   ├── CinematicIntro.jsx       # Multi-phase opening sequence & mandala
│   │   ├── FinalVictory.jsx         # Chakravyuha conquered sunrise finale
│   │   ├── FormationEntry.jsx       # Ceremonial gateway entry & narration
│   │   ├── FormationMap.jsx         # Interactive top-down SVG formation maps
│   │   ├── FormationsGallery.jsx    # Tactical breakdown of all 5 vyuhas
│   │   ├── GameHeader.jsx           # HUD with lives, score, and audio controls
│   │   ├── GameOver.jsx             # Twilight battlefield reflection & retry
│   │   ├── HowToPlay.jsx            # Game rules & mechanics guide
│   │   ├── KnowledgeArchive.jsx     # Philosophical archive & internal battlefield
│   │   ├── KrishnaBlessing.jsx      # Extra-life trivia challenge
│   │   ├── LevelComplete.jsx        # Formation conquered transition
│   │   ├── MainMenu.jsx             # Divine sacred geometry main menu
│   │   ├── QuestionPanel.jsx        # Scenario dilemma card & answer choices
│   │   ├── SettingsModal.jsx        # Audio volumes, particles & reduced motion
│   │   └── Timer.jsx                # Circular countdown timer with color pulse
│   ├── data/
│   │   ├── formationsLore.js        # Tactical & philosophical lore for 5 vyuhas
│   │   ├── levels.js                # Level configs, times, gate counts & themes
│   │   ├── mahabharataLore.js       # Virtues, warriors, and celestial astras
│   │   ├── mahabharataQuestions.js  # 35+ verified Mahabharata trivia questions
│   │   └── studentQuestions.js      # 36 curated student decision scenarios
│   ├── hooks/
│   │   └── useGameEngine.js         # Core state machine, scoring & localStorage
│   ├── styles/
│   │   ├── animations.css           # Keyframes for mandalas, chakras, rays & glow
│   │   ├── global.css               # Tailwind directives & typography
│   │   └── theme.css                # Color variables & ornamental borders
│   ├── utils/
│   │   └── soundEngine.js           # Procedural Web Audio API sound synthesizer
│   ├── App.jsx                      # Screen router and app coordinator
│   └── main.jsx                     # Vite React entry point
├── index.html                       # HTML5 template with Google Fonts (Cinzel, Inter)
├── tailwind.config.js               # Divine color palette & custom animations
└── vite.config.js                   # Vite configuration
```
