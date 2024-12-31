import { useState, useCallback, useRef } from 'react';
import { MAZE_LAYOUT } from '../utils/mazeData';
import { CELL_SIZE, MOVEMENT_SPEED } from '../utils/gameConstants';
import { isCollidingWithWall } from '../utils/gameUtils';
import { GameAudio } from '../utils/audio';
import type { Position, Direction } from '../types/game';

export const useGameState = () => {
  const [score, setScore] = useState(0);
  const positionRef = useRef<Position>({ 
    x: CELL_SIZE * 1.5, 
    y: CELL_SIZE * 1.5 
  });
  const directionRef = useRef<Direction>({ x: 0, y: 0 });
  const [pellets, setPellets] = useState(() => {
    const initialPellets = [];
    for (let y = 0; y < MAZE_LAYOUT.length; y++) {
      for (let x = 0; x < MAZE_LAYOUT[y].length; x++) {
        if (MAZE_LAYOUT[y][x] === '.') {
          initialPellets.push({
            x: x * CELL_SIZE + CELL_SIZE / 2,
            y: y * CELL_SIZE + CELL_SIZE / 2,
          });
        }
      }
    }
    return initialPellets;
  });

  const setDirection = useCallback((newDirection: Direction) => {
    directionRef.current = newDirection;
  }, []);

  const updatePosition = useCallback(() => {
    const newX = positionRef.current.x + directionRef.current.x * MOVEMENT_SPEED;
    const newY = positionRef.current.y + directionRef.current.y * MOVEMENT_SPEED;

    const newPosition = { x: newX, y: newY };
    if (!isCollidingWithWall(newPosition)) {
      positionRef.current = newPosition;
    }
    
    return positionRef.current;
  }, []);

  const collectPellet = useCallback((pellet: Position) => {
    setPellets(prev => prev.filter(p => 
      p.x !== pellet.x || p.y !== pellet.y
    ));
    setScore(s => s + 10);
    GameAudio.playHeartCollectSound();
  }, []);

  const collectSpecialStar = useCallback((index: number) => {
    setScore(s => s + 50);
  }, []);

  return {
    getPosition: () => positionRef.current,
    direction: directionRef.current,
    pellets,
    score,
    updatePosition,
    setDirection,
    collectPellet,
    collectSpecialStar,
  };
};