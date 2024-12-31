import { Position } from '../types/game';
import { MAZE_LAYOUT } from './mazeData';
import { CELL_SIZE } from './gameConstants';

// Check if position collides with maze walls
export const isCollidingWithWall = (position: Position): boolean => {
  const gridX = Math.floor(position.x / CELL_SIZE);
  const gridY = Math.floor(position.y / CELL_SIZE);
  
  // Allow movement anywhere as long as it's not hitting a wall
  return MAZE_LAYOUT[gridY]?.[gridX] === '#';
};

// Check if position is outside the maze's outer borders
export const isOutsideMazeBorders = (position: Position): boolean => {
  const gridX = Math.floor(position.x / CELL_SIZE);
  const gridY = Math.floor(position.y / CELL_SIZE);
  
  return gridY < 0 || gridY >= MAZE_LAYOUT.length || 
         gridX < 0 || gridX >= MAZE_LAYOUT[0].length;
};