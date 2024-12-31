import { colors } from './colors';

export const drawBunny16Bit = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  phase: number
) => {
  // Reduced size to 0.75x of original
  const scale = 0.75;
  
  // Body
  ctx.fillStyle = colors.bunnyBody;
  ctx.fillRect(x + 12 * scale, y + 12 * scale - phase * 6, 24 * scale, 24 * scale);
  
  // Head
  ctx.fillRect(x + 8 * scale, y - phase * 6, 12 * scale, 12 * scale);
  
  // Ears
  ctx.fillRect(x + 10 * scale, y - 16 * scale - phase * 6, 6 * scale, 20 * scale);
  ctx.fillRect(x + 20 * scale, y - 16 * scale - phase * 6, 6 * scale, 20 * scale);
  
  // Inner ears
  ctx.fillStyle = colors.bunnyDetails;
  ctx.fillRect(x + 11 * scale, y - 12 * scale - phase * 6, 3 * scale, 12 * scale);
  ctx.fillRect(x + 21 * scale, y - 12 * scale - phase * 6, 3 * scale, 12 * scale);
  
  // Eyes
  ctx.fillStyle = '#000000';
  ctx.fillRect(x + 10 * scale, y + 3 * scale - phase * 6, 3 * scale, 3 * scale);
  ctx.fillRect(x + 16 * scale, y + 3 * scale - phase * 6, 3 * scale, 3 * scale);
  
  // Nose
  ctx.fillStyle = colors.bunnyDetails;
  ctx.fillRect(x + 13 * scale, y + 6 * scale - phase * 6, 3 * scale, 3 * scale);
};