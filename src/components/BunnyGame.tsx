import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../utils/colors';
import { drawBunny16Bit } from '../utils/bunnySprite';
import { CELL_SIZE, DIRECTIONS } from '../utils/gameConstants';
import { MAZE_LAYOUT } from '../utils/mazeData';
import { useGameState } from '../hooks/useGameState';
import { drawMaze, drawPellets } from '../utils/gameRenderer';
import { generateSpecialStarPositions } from '../utils/specialItems';
import { FireworksEffect } from '../utils/fireworks';
import { isOutsideMazeBorders } from '../utils/gameUtils';
import MobileControls from './MobileControls';
import FreedomMessage from './FreedomMessage';

const BunnyGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const fireworksRef = useRef(new FireworksEffect());
  const [specialStars, setSpecialStars] = useState(generateSpecialStarPositions());
  const [showFreedom, setShowFreedom] = useState(false);
  
  const {
    getPosition,
    pellets,
    score,
    updatePosition,
    setDirection,
    collectPellet,
    collectSpecialStar
  } = useGameState();

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          canvasRef.current.width = container.clientWidth;
          canvasRef.current.height = container.clientHeight;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
          setDirection(DIRECTIONS.UP);
          break;
        case 'ArrowDown':
          setDirection(DIRECTIONS.DOWN);
          break;
        case 'ArrowLeft':
          setDirection(DIRECTIONS.LEFT);
          break;
        case 'ArrowRight':
          setDirection(DIRECTIONS.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setDirection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const position = updatePosition();
      setShowFreedom(isOutsideMazeBorders(position));

      // Draw game elements
      ctx.save();
      const scale = Math.min(
        canvas.width / (MAZE_LAYOUT[0].length * CELL_SIZE),
        canvas.height / (MAZE_LAYOUT.length * CELL_SIZE)
      );
      ctx.scale(scale, scale);

      drawMaze(ctx);
      drawPellets(ctx, pellets, specialStars);
      drawBunny16Bit(ctx, position.x - CELL_SIZE / 2, position.y - CELL_SIZE / 2, 0);

      // Check collisions
      pellets.forEach(pellet => {
        const distance = Math.hypot(pellet.x - position.x, pellet.y - position.y);
        if (distance < CELL_SIZE / 2) {
          collectPellet(pellet);
        }
      });

      specialStars.forEach((star, index) => {
        const distance = Math.hypot(star.x - position.x, star.y - position.y);
        if (distance < CELL_SIZE / 2) {
          collectSpecialStar(index);
          fireworksRef.current.createExplosion(star.x, star.y);
          setSpecialStars(prev => prev.filter((_, i) => i !== index));
        }
      });

      if (fireworksRef.current.isActive()) {
        fireworksRef.current.update();
        fireworksRef.current.draw(ctx);
      }

      ctx.restore();
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updatePosition, pellets, specialStars, collectPellet, collectSpecialStar]);

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="relative flex-grow">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
        <MobileControls onDirectionChange={setDirection} />
        {showFreedom && <FreedomMessage show={true} />}
      </div>
      <div className="bg-[#32cd32] px-4 py-2 text-xl font-['VT323'] text-center text-red-600">
        Score: {score}
      </div>
    </div>
  );
};

export default BunnyGame;