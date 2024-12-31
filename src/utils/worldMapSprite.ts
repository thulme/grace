import { colors } from './colors';

export const drawDetailedContinent = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  ctx.fillStyle = colors.mapLand;
  ctx.fillRect(x, y, width, height);
  
  // Add pixel details
  ctx.fillStyle = colors.mapBorder;
  for (let i = 0; i < width; i += 4) {
    ctx.fillRect(x + i, y, 2, 2);
    ctx.fillRect(x + i, y + height - 2, 2, 2);
  }
};