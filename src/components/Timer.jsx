import React, { useEffect, useState } from 'react';

export default function Timer({ initialTime, onTimeUp, isPaused }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, onTimeUp]);

  // Calculate SVG stroke offset for circular countdown
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, timeLeft / initialTime);
  const strokeDashoffset = circumference - progressRatio * circumference;

  const isLowTime = timeLeft <= 5;
  const isMidTime = timeLeft <= initialTime * 0.4;

  const strokeColor = isLowTime
    ? '#EF4444' // Urgent Red
    : isMidTime
    ? '#E68A24' // Sacred Saffron
    : '#FFD778'; // Divine Gold

  return (
    <div className={`relative flex items-center justify-center ${isLowTime ? 'animate-bounce' : ''}`}>
      <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 60 60">
        {/* Track circle */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="rgba(214, 166, 75, 0.2)"
          strokeWidth="3.5"
        />
        {/* Animated Countdown progress */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 linear"
        />
      </svg>
      {/* Time Text */}
      <span
        className={`absolute font-cinzel font-bold text-sm md:text-base ${
          isLowTime ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]' : 'text-[#FFD778]'
        }`}
      >
        {timeLeft}s
      </span>
    </div>
  );
}
