import React, { useEffect, useRef } from 'react';

export default function CelestialCanvas({ density = 'high', reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = reducedMotion ? 20 : (density === 'low' ? 35 : (density === 'medium' ? 65 : 100));
    const particles = [];

    // Colors: Divine gold, sacred saffron, celestial cyan, warm ivory
    const colors = [
      'rgba(255, 215, 120, ',
      'rgba(214, 166, 75, ',
      'rgba(230, 138, 36, ',
      'rgba(126, 220, 235, ',
      'rgba(255, 241, 208, '
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.35),
        speedY: -Math.random() * (reducedMotion ? 0.1 : 0.6) - 0.1, // Float upward like sacred embers
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulseVal) * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorBase + currentAlpha + ')';
        ctx.shadowColor = p.colorBase + '0.8)';
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
