import { useState, useEffect, useCallback } from 'react';
import { LEVELS, TOTAL_LIVES } from '../data/levels';
import { STUDENT_QUESTIONS } from '../data/studentQuestions';
import { soundEngine } from '../utils/soundEngine';

const STORAGE_KEY = 'vyuha_game_save_v1';
const SETTINGS_KEY = 'vyuha_game_settings_v1';

export function useGameEngine() {
  // Navigation screen
  const [screen, setScreen] = useState('intro');

  // Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      isMuted: false,
      soundVolume: 0.7,
      musicVolume: 0.5,
      particleDensity: 'high',
      reducedMotion: false,
    };
  });

  // Gameplay State
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [lives, setLives] = useState(TOTAL_LIVES);
  const [score, setScore] = useState(0);
  const [wisdomPoints, setWisdomPoints] = useState(0);
  const [blessingUsedThisLevel, setBlessingUsedThisLevel] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  
  // Active Question & Feedback
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    totalAnswered: 0,
    correctCount: 0,
    incorrectCount: 0,
    blessingsEarned: 0,
    startTime: Date.now(),
  });

  // Settings persistence & soundEngine sync
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    soundEngine.setMuted(settings.isMuted);
    soundEngine.setSoundVolume(settings.soundVolume);
    soundEngine.setMusicVolume(settings.musicVolume);
  }, [settings]);

  // Check saved game
  const [hasSaveGame, setHasSaveGame] = useState(false);
  useEffect(() => {
    const save = localStorage.getItem(STORAGE_KEY);
    if (save) {
      try {
        const parsed = JSON.parse(save);
        if (parsed.lives > 0 && parsed.currentLevelIndex < 5) {
          setHasSaveGame(true);
        }
      } catch (e) {}
    }
  }, []);

  const saveProgress = useCallback((lvlIdx, nodeIdx, curLives, curScore, curWisdom, doneLevels) => {
    const data = {
      currentLevelIndex: lvlIdx,
      currentNodeIndex: nodeIdx,
      lives: curLives,
      score: curScore,
      wisdomPoints: curWisdom,
      completedLevels: doneLevels,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setHasSaveGame(true);
  }, []);

  // Update sound engine settings
  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  // Current Level Object
  const currentLevel = LEVELS[currentLevelIndex] || LEVELS[0];

  // Start a fresh new journey
  const startNewJourney = useCallback(() => {
    soundEngine.playConch();
    setCurrentLevelIndex(0);
    setCurrentNodeIndex(0);
    setLives(TOTAL_LIVES);
    setScore(0);
    setWisdomPoints(0);
    setBlessingUsedThisLevel(false);
    setCompletedLevels([]);
    setStats({
      totalAnswered: 0,
      correctCount: 0,
      incorrectCount: 0,
      blessingsEarned: 0,
      startTime: Date.now(),
    });
    setScreen('formationEntry');
  }, []);

  // Continue saved journey
  const continueJourney = useCallback(() => {
    const save = localStorage.getItem(STORAGE_KEY);
    if (save) {
      try {
        const parsed = JSON.parse(save);
        setCurrentLevelIndex(parsed.currentLevelIndex || 0);
        setCurrentNodeIndex(parsed.currentNodeIndex || 0);
        setLives(parsed.lives || TOTAL_LIVES);
        setScore(parsed.score || 0);
        setWisdomPoints(parsed.wisdomPoints || 0);
        setCompletedLevels(parsed.completedLevels || []);
        setBlessingUsedThisLevel(false);
        soundEngine.playTempleBell(1.2);
        setScreen('formationMap');
        return;
      } catch (e) {}
    }
    startNewJourney();
  }, [startNewJourney]);

  // Select level directly (from level selection screen)
  const selectLevel = useCallback((lvlIndex) => {
    soundEngine.playClick();
    setCurrentLevelIndex(lvlIndex);
    setCurrentNodeIndex(0);
    setBlessingUsedThisLevel(false);
    setScreen('formationEntry');
  }, []);

  // Enter formation from the entry narration cinematic
  const enterFormationMap = useCallback(() => {
    soundEngine.playConch();
    setScreen('formationMap');
  }, []);

  // Click a node on the formation map to face its challenge
  const startQuestionForNode = useCallback((nodeIndex) => {
    soundEngine.playClick();
    const lvlKey = currentLevel.key;
    const questions = STUDENT_QUESTIONS[lvlKey] || [];
    const q = questions[nodeIndex] || questions[0];
    setActiveQuestion(q);
    setSelectedOptionIndex(null);
    setFeedbackData(null);
    setScreen('question');
  }, [currentLevel]);

  // Answer a question (or timeout triggered with optionIndex === null)
  const submitAnswer = useCallback((optionIndex, remainingTime) => {
    if (!activeQuestion) return;

    const isCorrect = optionIndex === activeQuestion.correctIndex;
    setSelectedOptionIndex(optionIndex);

    setStats((prev) => ({
      ...prev,
      totalAnswered: prev.totalAnswered + 1,
      correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
      incorrectCount: isCorrect ? prev.incorrectCount : prev.incorrectCount + 1,
    }));

    if (isCorrect) {
      soundEngine.playCorrect();
      // Score calculation: Base 100 + speed bonus (remaining seconds * 10)
      const speedBonus = Math.max(0, Math.floor(remainingTime * 10));
      const addedPoints = 100 + speedBonus;
      setScore((s) => s + addedPoints);
      setWisdomPoints((w) => w + 50);

      setFeedbackData({
        isCorrect: true,
        scenario: activeQuestion.scenario,
        selectedOption: activeQuestion.options[optionIndex],
        correctOption: activeQuestion.options[activeQuestion.correctIndex],
        explanation: activeQuestion.explanation,
        virtue: activeQuestion.virtue,
        gitaQuote: activeQuestion.gitaQuote,
        pointsAwarded: addedPoints,
        speedBonus,
      });
    } else {
      soundEngine.playIncorrect();
      const newLives = lives - 1;
      setLives(newLives);

      setFeedbackData({
        isCorrect: false,
        scenario: activeQuestion.scenario,
        selectedOption: optionIndex !== null ? activeQuestion.options[optionIndex] : "Time expired before an answer was chosen.",
        correctOption: activeQuestion.options[activeQuestion.correctIndex],
        explanation: activeQuestion.explanation,
        virtue: activeQuestion.virtue,
        gitaQuote: activeQuestion.gitaQuote,
        pointsAwarded: 0,
        speedBonus: 0,
        livesRemaining: newLives,
      });
    }

    setScreen('feedback');
  }, [activeQuestion, lives]);

  // Proceed after reading feedback
  const proceedAfterFeedback = useCallback(() => {
    soundEngine.playClick();
    if (!feedbackData) return;

    if (feedbackData.isCorrect) {
      const nextNode = currentNodeIndex + 1;
      const totalNodes = currentLevel.questionCount;

      if (nextNode >= totalNodes) {
        // Formation Completed!
        soundEngine.playVictory();
        const updatedCompleted = Array.from(new Set([...completedLevels, currentLevel.id]));
        setCompletedLevels(updatedCompleted);
        saveProgress(currentLevelIndex + 1, 0, lives, score, wisdomPoints, updatedCompleted);

        if (currentLevelIndex >= 4) {
          // Finished Level 5: Chakravyuha! Ultimate Victory!
          setScreen('finalVictory');
        } else {
          setScreen('levelComplete');
        }
      } else {
        // Move to next node in current formation
        setCurrentNodeIndex(nextNode);
        saveProgress(currentLevelIndex, nextNode, lives, score, wisdomPoints, completedLevels);
        setScreen('formationMap');
      }
    } else {
      // Incorrect answer: Check lives and Krishna's blessing
      if (lives <= 0) {
        // Out of lives: offer Krishna's blessing if not used yet on this level
        if (!blessingUsedThisLevel) {
          soundEngine.playKrishnaBlessing();
          setScreen('krishnaBlessing');
        } else {
          setScreen('gameOver');
        }
      } else {
        // Still has lives remaining; can retry this node
        saveProgress(currentLevelIndex, currentNodeIndex, lives, score, wisdomPoints, completedLevels);
        setScreen('formationMap');
      }
    }
  }, [feedbackData, currentNodeIndex, currentLevel, currentLevelIndex, completedLevels, lives, score, wisdomPoints, blessingUsedThisLevel, saveProgress]);

  // Resolve Krishna's Blessing
  const handleBlessingResult = useCallback((success) => {
    setBlessingUsedThisLevel(true);
    if (success) {
      soundEngine.playKrishnaBlessing();
      setLives(1); // Restores 1 life
      setStats((prev) => ({ ...prev, blessingsEarned: prev.blessingsEarned + 1 }));
      saveProgress(currentLevelIndex, currentNodeIndex, 1, score, wisdomPoints + 100, completedLevels);
      setScreen('formationMap');
    } else {
      setScreen('gameOver');
    }
  }, [currentLevelIndex, currentNodeIndex, score, wisdomPoints, completedLevels, saveProgress]);

  // Advance to next level after level completion
  const advanceToNextLevel = useCallback(() => {
    soundEngine.playConch();
    const nextLvl = currentLevelIndex + 1;
    if (nextLvl < LEVELS.length) {
      setCurrentLevelIndex(nextLvl);
      setCurrentNodeIndex(0);
      setBlessingUsedThisLevel(false);
      setScreen('formationEntry');
    } else {
      setScreen('finalVictory');
    }
  }, [currentLevelIndex]);

  // Retry level after game over
  const retryCurrentLevel = useCallback(() => {
    soundEngine.playTempleBell(1);
    setCurrentNodeIndex(0);
    setLives(TOTAL_LIVES);
    setBlessingUsedThisLevel(false);
    setScreen('formationEntry');
  }, []);

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSaveGame(false);
    setCurrentLevelIndex(0);
    setCurrentNodeIndex(0);
    setLives(TOTAL_LIVES);
    setScore(0);
    setWisdomPoints(0);
    setCompletedLevels([]);
    setScreen('menu');
  }, []);

  return {
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
    selectedOptionIndex,
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
  };
}
