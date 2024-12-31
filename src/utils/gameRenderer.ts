import { colors } from './colors';
import { MAZE_LAYOUT } from './mazeData';
import { CELL_SIZE } from './gameConstants';
import type { Position } from '../types/game';

// Draw the maze walls
export const drawMaze = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = colors.mapBorder;
  for (let y = 0; y < MAZE_LAYOUT.length; y++) {
    for (let x = 0; x < MAZE_LAYOUT[y].length; x++) {
      if (MAZE_LAYOUT[y][x] === '#') {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
};

// Draw a single heart
export const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const scale = 0.825; // Increased by 10%
  ctx.beginPath();
  ctx.moveTo(x, y + 3 * scale);
  ctx.bezierCurveTo(x, y, x - 6 * scale, y, x - 6 * scale, y + 3 * scale);
  ctx.bezierCurveTo(x - 6 * scale, y + 6 * scale, x, y + 9 * scale, x, y + 9 * scale);
  ctx.bezierCurveTo(x, y + 9 * scale, x + 6 * scale, y + 6 * scale, x + 6 * scale, y + 3 * scale);
  ctx.bezierCurveTo(x + 6 * scale, y, x, y, x, y + 3 * scale);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
};

// Draw a single star
export const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const spikes = 5;
  const outerRadius = 8;
  const innerRadius = 3;

  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(
      x + Math.cos(rot) * outerRadius,
      y + Math.sin(rot) * outerRadius
    );
    rot += step;

    ctx.lineTo(
      x + Math.cos(rot) * innerRadius,
      y + Math.sin(rot) * innerRadius
    );
    rot += step;
  }
  
  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fillStyle = '#ffd700';
  ctx.fill();
};

// Draw all pellets and special stars
export const drawPellets = (
  ctx: CanvasRenderingContext2D, 
  pellets: Position[], 
  specialStars: Position[]
) => {
  // Draw regular pellets (hearts)
  pellets.forEach(pellet => {
    drawHeart(ctx, pellet.x, pellet.y);
  });
  
  // Draw special stars
  specialStars.forEach(star => {
    drawStar(ctx, star.x, star.y);
  });
};