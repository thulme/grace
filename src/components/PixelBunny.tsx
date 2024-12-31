import React, { useEffect, useRef } from 'react';
import { colors } from '../utils/colors';
import { drawBunny16Bit } from '../utils/bunnySprite';

const PixelBunny: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionRef = useRef({ x: 100, y: 120 });
  const footprintsRef = useRef<Array<{ x: number, y: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let jumpPhase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw sparkly footprints
      footprintsRef.current.forEach((print, index) => {
        ctx.fillStyle = colors.footprints;
        const size = 8 + Math.sin(Date.now() / 200 + index) * 2;
        ctx.fillRect(print.x + 15, print.y + 30, size, size);
        ctx.fillRect(print.x + 27, print.y + 30, size, size);
      });

      positionRef.current.x = (positionRef.current.x + 3) % canvas.width;
      jumpPhase = (jumpPhase + 0.1) % Math.PI;
      
      if (Math.sin(jumpPhase) < -0.5) {
        footprintsRef.current.push({ ...positionRef.current });
        if (footprintsRef.current.length > 10) {
          footprintsRef.current.shift();
        }
      }

      drawBunny16Bit(
        ctx,
        positionRef.current.x,
        positionRef.current.y + Math.sin(jumpPhase) * 30,
        Math.abs(Math.sin(jumpPhase))
      );

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      className="pixel-canvas border-4 border-[#32cd32] rounded-lg"
    />
  );
};

export default PixelBunny;