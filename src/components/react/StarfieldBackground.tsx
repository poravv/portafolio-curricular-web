'use client';
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

/** Fixed starfield canvas + floating blobs + mesh grid overlay. Purely decorative. */
export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const generateStars = () => {
      stars.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 0.016;

      stars.forEach(star => {
        const opacity = star.opacity * (0.7 + 0.3 * Math.sin(frame * star.twinkleSpeed * 60 + star.twinkleOffset));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    generateStars();
    draw();

    const handleResize = () => {
      resize();
      generateStars();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Starfield canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Floating blobs — sized and opaque enough to be visible on dark background */}
      <div
        className="absolute rounded-full animate-blob-1 pointer-events-none"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.12) 40%, transparent 70%)',
          filter: 'blur(80px)',
          top: '-15%',
          left: '-10%',
        }}
      />
      <div
        className="absolute rounded-full animate-blob-2 pointer-events-none"
        style={{
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.30) 0%, rgba(6,182,212,0.10) 40%, transparent 70%)',
          filter: 'blur(80px)',
          top: '25%',
          right: '-12%',
        }}
      />
      <div
        className="absolute rounded-full animate-blob-3 pointer-events-none"
        style={{
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(244,63,94,0.20) 0%, rgba(244,63,94,0.06) 40%, transparent 70%)',
          filter: 'blur(90px)',
          bottom: '0%',
          left: '25%',
        }}
      />

      {/* Mesh grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
    </div>
  );
}
