export const drawBunny = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  phase: number
) => {
  ctx.fillStyle = '#ff69b4';
  
  // Larger bunny
  ctx.fillRect(x + 12, y + 12 - phase * 6, 24, 24); // Body
  ctx.fillRect(x + 6, y - phase * 6, 12, 12); // Head
  ctx.fillRect(x + 18, y - 6 - phase * 6, 6, 18); // Ears
  
  // Eyes
  ctx.fillStyle = '#000';
  ctx.fillRect(x + 8, y + 2 - phase * 6, 2, 2);
};

export const drawFootprint = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  ctx.fillStyle = 'rgba(255, 105, 180, 0.3)';
  ctx.fillRect(x + 15, y + 30, 6, 6);
  ctx.fillRect(x + 27, y + 30, 6, 6);
};