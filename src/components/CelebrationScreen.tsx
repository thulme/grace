import React, { useEffect, useRef } from 'react';
import { colors } from '../utils/colors';
import { drawHeart } from '../utils/gameRenderer';
import { BackgroundMusic } from '../utils/backgroundMusic';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

const CelebrationScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Start background music
    BackgroundMusic.playArcadeMusic();

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create initial hearts
    const heartColors = ['#ff0000', '#ff69b4', '#ff1493', '#ff007f'];
    for (let i = 0; i < 50; i++) {
      heartsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 20,
        speed: 0.5 + Math.random() * 1.5,
        color: heartColors[Math.floor(Math.random() * heartColors.length)]
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update hearts
      heartsRef.current.forEach(heart => {
        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.scale(heart.size / 20, heart.size / 20);
        ctx.fillStyle = heart.color;
        drawHeart(ctx, 0, 0);
        ctx.restore();

        // Move heart
        heart.y -= heart.speed;
        if (heart.y + heart.size < 0) {
          heart.y = canvas.height + heart.size;
        }
      });

      // Draw "Have a Nice Day" text
      const mainText = "Have a Nice Day";
      ctx.font = 'bold 48px VT323';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw colorful main text with shadow
      mainText.split('').forEach((char, i) => {
        const x = canvas.width/2 - (mainText.length * 20)/2 + i * 40;
        const y = canvas.height/2;
        const hue = (i * 360/mainText.length + Date.now()/50) % 360;
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillText(char, x + 2, y + 2);
        
        // Main text
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillText(char, x, y);
      });

      // Draw production credit
      const creditText = "Grace & Daddy Productions, NYE 2024";
      ctx.font = '24px VT323';
      ctx.textAlign = 'center';
      
      // Draw credit text with rainbow effect
      creditText.split('').forEach((char, i) => {
        const x = canvas.width/2 - (creditText.length * 10)/2 + i * 20;
        const y = canvas.height/2 + 50;
        const hue = (i * 360/creditText.length + Date.now()/50) % 360;
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillText(char, x + 1, y + 1);
        
        // Credit text
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillText(char, x, y);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      BackgroundMusic.stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default CelebrationScreen;