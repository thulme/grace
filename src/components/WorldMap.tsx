import React, { useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';
import { colors } from '../utils/colors';
import { drawDetailedContinent } from '../utils/worldMapSprite';

const WorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showRocket, setShowRocket] = React.useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.fillStyle = colors.mapWater;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw detailed continents
      drawDetailedContinent(ctx, 100, 80, 200, 160); // Americas
      drawDetailedContinent(ctx, 360, 60, 160, 120); // Europe/Africa
      drawDetailedContinent(ctx, 560, 80, 160, 140); // Asia

      // London marker with pulse effect
      const pulseSize = 8 + Math.sin(Date.now() / 200) * 4;
      ctx.fillStyle = colors.rocketColor;
      ctx.fillRect(380, 100, pulseSize, pulseSize);

      requestAnimationFrame(animate);
    };

    animate();

    const rocketInterval = setInterval(() => {
      setShowRocket(prev => !prev);
    }, 500);

    return () => clearInterval(rocketInterval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        className="pixel-canvas rounded-lg border-4 border-[#32cd32]"
      />
      {showRocket && (
        <Rocket 
          className="absolute top-[80px] left-[360px] text-[#ff1493] transform rotate-45 animate-bounce" 
          size={32}
        />
      )}
    </div>
  );
}

export default WorldMap;