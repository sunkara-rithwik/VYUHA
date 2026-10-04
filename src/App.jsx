import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameEngine } from './hooks/useGameEngine';
import CelestialCanvas from './components/CelestialCanvas';
import GameHeader from './components/GameHeader';
import CinematicIntro from './components/CinematicIntro';
import MainMenu from './components/MainMenu';
import FormationEntry from './components/FormationEntry';
import FormationMap from './components/FormationMap';
import QuestionPanel from './components/QuestionPanel';
import AnswerFeedback from './components/AnswerFeedback';
import KrishnaBlessing from './components/KrishnaBlessing';
import LevelComplete from './components/LevelComplete';
import GameOver from './components/GameOver';
import FinalVictory from './components/FinalVictory';
import FormationsGallery from './components/FormationsGallery';
import KnowledgeArchive from './components/KnowledgeArchive';
import HowToPlay from './components/HowToPlay';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const {
    screen,
    setScreen,
    settings,
    updateSettings,
    currentLevel,
    currentLevelIndex,
    currentNodeIndex,
    lives,
    score,
    wisdomPoints,
    completedLevels,
    stats,
    hasSaveGame,
    activeQuestion,
    feedbackData,
    startNewJourney,
    continueJourney,
    selectLevel,
    enterFormationMap,
    startQuestionForNode,
    submitAnswer,
    proceedAfterFeedback,
    handleBlessingResult,
    advanceToNextLevel,
    retryCurrentLevel,
    resetAllProgress,
  } = useGameEngine();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isGameplayHUDActive =
    screen === 'formationMap' || screen === 'question' || screen === 'feedback';

  return (
    <div className="relative min-h-screen w-full bg-[#08091A] text-[#FFF1D0] font-sans antialiased overflow-x-hidden">
      {/* Layer 0: Ambient Floating Golden Particles & Cosmic Embers */}
      <CelestialCanvas
        density={settings.particleDensity}
        reducedMotion={settings.reducedMotion}
      />

      {/* Layer 1: Persistent Gameplay HUD (when inside active formation) */}
      {isGameplayHUDActive && (
        <GameHeader
          level={currentLevel}
          currentNodeIndex={currentNodeIndex}
          lives={lives}
          score={score}
          wisdomPoints={wisdomPoints}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onBackToMenu={() => setScreen('menu')}
          isMuted={settings.isMuted}
          onToggleMute={() => updateSettings({ isMuted: !settings.isMuted })}
        />
      )}

      {/* Layer 2: Main Active Screen */}
      <main className="relative z-10 w-full min-h-[calc(100vh-60px)] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* 1. Cinematic Introduction */}
          {screen === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CinematicIntro
                onComplete={() => setScreen('menu')}
                isMuted={settings.isMuted}
                onToggleMute={() => updateSettings({ isMuted: !settings.isMuted })}
              />
            </motion.div>
          )}

          {/* 2. Main Menu */}
          {screen === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MainMenu
                onStartNewJourney={startNewJourney}
                onContinueJourney={continueJourney}
                hasSaveGame={hasSaveGame}
                onOpenFormations={() => setScreen('formationsGallery')}
                onOpenKnowledge={() => setScreen('knowledgeArchive')}
                onOpenHowToPlay={() => setScreen('howToPlay')}
                onOpenSettings={() => setIsSettingsOpen(true)}
                isMuted={settings.isMuted}
                onToggleMute={() => updateSettings({ isMuted: !settings.isMuted })}
              />
            </motion.div>
          )}

          {/* 3. The Sacred Formations Gallery */}
          {screen === 'formationsGallery' && (
            <motion.div
              key="formationsGallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormationsGallery
                onBack={() => setScreen('menu')}
                onPlayFormation={(lvlIdx) => selectLevel(lvlIdx)}
              />
            </motion.div>
          )}

          {/* 4. Mahabharata Knowledge Archive */}
          {screen === 'knowledgeArchive' && (
            <motion.div
              key="knowledgeArchive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <KnowledgeArchive onBack={() => setScreen('menu')} />
            </motion.div>
          )}

          {/* 5. How to Play Rules & Mechanics */}
          {screen === 'howToPlay' && (
            <motion.div
              key="howToPlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HowToPlay
                onBack={() => setScreen('menu')}
                onStartPlaying={startNewJourney}
              />
            </motion.div>
          )}

          {/* 6. Formation Entry Scene & Narration */}
          {screen === 'formationEntry' && (
            <motion.div
              key="formationEntry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FormationEntry
                level={currentLevel}
                onEnterFormation={enterFormationMap}
              />
            </motion.div>
          )}

          {/* 7. Interactive Formation Battlefield Navigation Map */}
          {screen === 'formationMap' && (
            <motion.div
              key="formationMap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FormationMap
                level={currentLevel}
                currentNodeIndex={currentNodeIndex}
                onSelectNode={(nodeIdx) => startQuestionForNode(nodeIdx)}
              />
            </motion.div>
          )}

          {/* 8. Question & Dilemma Panel */}
          {screen === 'question' && activeQuestion && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionPanel
                level={currentLevel}
                nodeIndex={currentNodeIndex}
                question={activeQuestion}
                onSubmitAnswer={submitAnswer}
              />
            </motion.div>
          )}

          {/* 9. Answer Feedback Review */}
          {screen === 'feedback' && feedbackData && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnswerFeedback
                feedback={feedbackData}
                lives={lives}
                onProceed={proceedAfterFeedback}
              />
            </motion.div>
          )}

          {/* 10. Krishna's Blessing Recovery Challenge */}
          {screen === 'krishnaBlessing' && (
            <motion.div
              key="krishnaBlessing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <KrishnaBlessing onCompleteBlessing={handleBlessingResult} />
            </motion.div>
          )}

          {/* 11. Level Complete Victory Screen */}
          {screen === 'levelComplete' && (
            <motion.div
              key="levelComplete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LevelComplete
                level={currentLevel}
                score={score}
                wisdomPoints={wisdomPoints}
                lives={lives}
                onNextLevel={advanceToNextLevel}
              />
            </motion.div>
          )}

          {/* 12. Game Over Screen */}
          {screen === 'gameOver' && (
            <motion.div
              key="gameOver"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GameOver
                level={currentLevel}
                score={score}
                wisdomPoints={wisdomPoints}
                onRetryLevel={retryCurrentLevel}
                onBackToMenu={() => setScreen('menu')}
              />
            </motion.div>
          )}

          {/* 13. Final Victory (Chakravyuha Conquered) */}
          {screen === 'finalVictory' && (
            <motion.div
              key="finalVictory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FinalVictory
                score={score}
                wisdomPoints={wisdomPoints}
                stats={stats}
                onRestartNew={startNewJourney}
                onBackToMenu={() => setScreen('menu')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Layer 3: Settings & Audio Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={updateSettings}
          onResetProgress={resetAllProgress}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
