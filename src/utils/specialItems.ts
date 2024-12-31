import { Position } from '../types/game';
import { CELL_SIZE } from './gameConstants';
import { MAZE_LAYOUT } from './mazeData';

// Helper to check if a position is valid (not on a wall)
const isValidPosition = (gridX: number, gridY: number): boolean => {
  return MAZE_LAYOUT[gridY]?.[gridX] === '.';
};

export const generateSpecialStarPositions = (): Position[] => {
  const positions: Position[] = [];
  const attempts = 20; // Maximum attempts to find valid positions
  
  while (positions.length < 2 && attempts > 0) {
    // Generate random position within maze bounds
    const gridX = Math.floor(Math.random() * (MAZE_LAYOUT[0].length - 2)) + 1;
    const gridY = Math.floor(Math.random() * (MAZE_LAYOUT.length - 2)) + 1;
    
    // Only add if position is valid (not on a wall) and not already used
    if (isValidPosition(gridX, gridY)) {
      const position = {
        x: gridX * CELL_SIZE + CELL_SIZE / 2,
        y: gridY * CELL_SIZE + CELL_SIZE / 2
      };
      
      // Check if this position is already used
      if (!positions.some(p => p.x === position.x && p.y === position.y)) {
        positions.push(position);
      }
    }
  }
  
  return positions;
}