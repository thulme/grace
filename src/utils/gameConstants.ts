export const GRID_SIZE = 20;
export const CELL_SIZE = 25; // Reduced from 30 to 25
export const MOVEMENT_SPEED = 1.5; // Reduced from 2 to 1.5 for smoother movement
export const PELLET_SIZE = 4; // Reduced from 6 to 4

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
} as const;